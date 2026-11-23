const team = [
  {
    name: 'Алексей',
    role: 'CEO / директор',
    quote: 'Сложные процессы должны ощущаться для клиента просто.',
    image: '/assets/team-alexey.webp?v=nerida-portraits-20261123',
    alt: 'Алексей, CEO и директор компании НЕРИДА',
  },
  {
    name: 'Виктория',
    role: 'Менеджер по заявкам',
    quote: 'Хорошая работа начинается с точного ответа.',
    image: '/assets/team-viktoria.webp?v=nerida-portraits-20261123',
    alt: 'Виктория, менеджер по заявкам компании НЕРИДА',
  },
  {
    name: 'Илья',
    role: 'Логистика и доставка',
    quote: 'Маршрут важен не меньше, чем скорость.',
    image: '/assets/team-ilya.webp?v=nerida-portraits-20261123',
    alt: 'Илья, специалист по логистике и доставке компании НЕРИДА',
  },
  {
    name: 'Ксения',
    role: 'Бухгалтер',
    quote: 'В цифрах ценю точность, в работе — прозрачность.',
    image: '/assets/team-ksenia.webp?v=nerida-portraits-20261123',
    alt: 'Ксения, бухгалтер компании НЕРИДА',
  },
];

export default function TeamSection() {
  return (
    <section className="section team-section container" aria-labelledby="team-title">
      <div className="section-head team-section-head">
        <div>
          <div className="eyebrow">00 / НАШ СОСТАВ</div>
          <h2 id="team-title">
            Люди, которые держат
            <br />
            <span>ваш запрос в фокусе.</span>
          </h2>
        </div>
        <p>
          От первого сообщения до оплаты
          <br />и получения груза.
        </p>
      </div>

      <div className="team-grid">
        {team.map((member, index) => (
          <article className="team-card" key={member.name}>
            <div className="team-portrait">
              <img
                src={member.image}
                alt={member.alt}
                width="900"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="team-card-content">
              <div className="team-card-topline">
                <span className="team-role">{member.role}</span>
                <span className="team-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{member.name}</h3>
              <p className="team-quote">«{member.quote}»</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
