# Деплой КЛЕВЕР на VPS

Инструкция для готовой Node.js-сборки в каталоге `site/`, домена `cleverobmen.pro` и Ubuntu Server 24.04. Для другой версии Ubuntu названия пакетов и способ установки Certbot могут отличаться.

## Что понадобится

- VPS с публичным IPv4, Ubuntu Server 24.04 и доступом `sudo`.
- Доступ к DNS-записям домена `cleverobmen.pro`.
- Git-доступ к `https://github.com/Bell1488/clever.git`.
- Данные Telegram-бота, ID группы и рабочий SOCKS5h-прокси.
- Номер счётчика Яндекс Метрики. Если его ещё нет, оставьте `METRIKA_ID` пустым и завершите настройку до публичного запуска.

Сайт требует Node.js 22.13 или новее. Зависимости на VPS устанавливать не нужно: сервер и клиентская сборка уже находятся в `site/`.

## 1. Настройте DNS

В панели регистратора или DNS-провайдера добавьте записи:

| Тип | Имя | Значение |
|---|---|---|
| A | `@` | Публичный IPv4 вашего VPS |
| CNAME | `www` | `cleverobmen.pro` |

Если провайдер не поддерживает CNAME для `www`, добавьте для него A-запись на тот же IPv4. Не оставляйте AAAA-запись, если на VPS не настроен IPv6: часть посетителей тогда может попадать на недоступный адрес.

Проверьте, что DNS уже указывает на VPS:

```bash
dig +short A cleverobmen.pro
dig +short CNAME www.cleverobmen.pro
```

В первой команде должен появиться IPv4 VPS. Вторая должна вернуть `cleverobmen.pro` или адрес, в который DNS-провайдер разворачивает эту запись.

## 2. Подготовьте сервер

Подключитесь по SSH и обновите систему:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y ca-certificates curl git nginx ufw dnsutils
```

Откройте SSH, HTTP и HTTPS в системном firewall. Если у хостера есть отдельный сетевой firewall, откройте там TCP-порты 22, 80 и 443 тоже. Порт приложения `3000` наружу открывать не нужно.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## 3. Установите Node.js и получите сайт

Установите системный Node.js 22.x из репозитория NodeSource и проверьте версию:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x -o /tmp/nodesource_setup.sh
sudo -E bash /tmp/nodesource_setup.sh
sudo apt install -y nodejs
node --version
```

Версия должна быть не ниже `v22.13.0`. Создайте отдельного системного пользователя и клонируйте репозиторий:

```bash
sudo useradd --system --create-home --home-dir /opt/clever --shell /usr/sbin/nologin clever
sudo -u clever git clone https://github.com/Bell1488/clever.git /opt/clever
sudo install -d -o clever -g clever -m 0750 /var/lib/clever/data
```

Проверьте, что готовый сервер присутствует:

```bash
test -f /opt/clever/site/server.mjs && echo "Сборка найдена"
```

## 4. Настройте секреты и параметры сайта

Создайте отдельный env-файл вне Git и каталога сайта:

```bash
sudo install -d -m 0750 -o root -g clever /etc/clever
sudo install -m 0640 -o root -g clever /dev/null /etc/clever/clever.env
sudo nano /etc/clever/clever.env
```

Заполните файл. Замените примеры реальными значениями; токен, пароль прокси и ID группы не публикуйте:

```dotenv
PORT=3000
HOST=127.0.0.1
SITE_URL=https://cleverobmen.pro
METRIKA_ID=ВАШ_ЧИСЛОВОЙ_ID
TELEGRAM_URL=https://t.me/ВАША_ПУБЛИЧНАЯ_ССЫЛКА
CONTACT_PHONE=
CONTACT_EMAIL=
DATA_DIR=/var/lib/clever/data
PUBLIC_LAUNCH=false

TELEGRAM_BOT_TOKEN=ТОКЕН_БОТА
TELEGRAM_CHAT_ID=ID_ГРУППЫ
TELEGRAM_PROXY_URL=socks5h://ЛОГИН:ПАРОЛЬ@ХОСТ:ПОРТ
```

Логин и пароль прокси со специальными символами нужно URL-кодировать. `socks5h` оставляет DNS-разрешение Telegram на прокси-сервере. Файл содержит персональные данные конфигурации, поэтому его права должны оставаться `0640`, владелец — `root`, группа — `clever`.

## 5. Создайте службу systemd

Найдите системный путь к Node.js и запишите его в unit-файл. На стандартной установке это `/usr/bin/node`:

```bash
command -v node
sudo nano /etc/systemd/system/clever.service
```

Содержимое `/etc/systemd/system/clever.service`:

```ini
[Unit]
Description=Klever website and Telegram lead service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=clever
Group=clever
WorkingDirectory=/opt/clever/site
ExecStart=/usr/bin/node --env-file=/etc/clever/clever.env /opt/clever/site/server.mjs
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/lib/clever/data

[Install]
WantedBy=multi-user.target
```

Если `command -v node` показал другой путь, замените `/usr/bin/node` в `ExecStart`. Затем запустите службу:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now clever
sudo systemctl status clever --no-pager
curl -I http://127.0.0.1:3000/
```

Пока `PUBLIC_LAUNCH=false`, публичные страницы намеренно закрыты от индексации.

## 6. Подключите Nginx

Создайте конфигурацию виртуального хоста:

```bash
sudo nano /etc/nginx/sites-available/cleverobmen.pro
```

Вставьте конфигурацию для первичного HTTP-запуска и проверки Certbot:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name cleverobmen.pro www.cleverobmen.pro;

    client_max_body_size 32k;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Включите сайт и проверьте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/cleverobmen.pro /etc/nginx/sites-enabled/cleverobmen.pro
sudo nginx -t
sudo systemctl reload nginx
curl -I http://cleverobmen.pro/
```

Если ссылка уже существует, не создавайте её повторно. Убедитесь, что в Nginx нет другого активного `server` с теми же `server_name`.

## 7. Выпустите HTTPS-сертификат

После того как оба доменных имени разрешаются на VPS и HTTP-сайт доступен, установите Certbot через Snap и выпустите сертификат:

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/local/bin/certbot
sudo certbot --nginx --redirect -d cleverobmen.pro -d www.cleverobmen.pro
```

Certbot настроит HTTPS и перенаправление на защищённое соединение. Проверьте автоматическое продление:

```bash
sudo certbot renew --dry-run
curl -I https://cleverobmen.pro/
```

## 8. Проверьте сайт и доставку заявки

До включения индексации проверьте главную, карго, блог и статьи:

```bash
curl -I https://cleverobmen.pro/
curl -I https://cleverobmen.pro/cargo
curl -I https://cleverobmen.pro/blog
curl -I https://cleverobmen.pro/blog/oplata-postavshchiku-kitay
curl -s https://cleverobmen.pro/robots.txt
```

Откройте сайт в браузере и отправьте одну тестовую заявку с контролируемым контактом. Убедитесь, что она приходит в нужную Telegram-группу через SOCKS5h и что интерфейс показывает подтверждение отправки. При сбое проверьте логи:

```bash
sudo journalctl -u clever -n 100 --no-pager
sudo journalctl -u clever -f
```

Также проверьте в Яндекс Метрике цель `lead_success`. Не отмечайте доставку как проверенную, если тестовое сообщение не появилось в группе.

## 9. Включите публичную индексацию

После проверки домена, HTTPS, контактов, Метрики, реальной доставки Telegram и документов измените только параметр в env-файле:

```bash
sudo nano /etc/clever/clever.env
```

```dotenv
PUBLIC_LAUNCH=true
```

Примените настройку и проверьте публичные robots и sitemap:

```bash
sudo systemctl restart clever
curl -s https://cleverobmen.pro/robots.txt
curl -s https://cleverobmen.pro/sitemap.xml
```

Sitemap должен содержать главную, карго, блог и адреса всех шести статей. `/admin` должен возвращать `404`. Убедитесь, что `SITE_URL` задан без `www`, чтобы главным адресом оставался `https://cleverobmen.pro`.

## Обновление сайта

После публикации изменений в GitHub обновите сервер:

```bash
sudo -u clever git -C /opt/clever pull --ff-only
sudo systemctl restart clever
sudo systemctl status clever --no-pager
```

Проверяйте запуск после обновления через `curl -I https://cleverobmen.pro/` и `journalctl`. Файл `/etc/clever/clever.env` и заявки в `/var/lib/clever/data` не находятся в каталоге репозитория и не перезаписываются `git pull`.

## Резервное копирование и безопасность

- Не открывайте порт `3000` в firewall: Nginx подключается к Node через `127.0.0.1`.
- Не копируйте `.env`, токен Telegram, пароль прокси и файлы заявок в GitHub или каталог `public_html`.
- Ограничьте SSH ключами и включите регулярные обновления Ubuntu.
- Храните защищённую резервную копию `/var/lib/clever/data` с ограниченным доступом и согласованным сроком хранения заявок.
- После смены токена бота или пароля прокси обновите `/etc/clever/clever.env` и выполните `sudo systemctl restart clever`.
