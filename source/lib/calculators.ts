export const PAYMENT_RATE = 12.79;
export const PAYMENT_SERVICES = ['Alipay', 'WeChat', '1688', 'Taobao', 'Поставщик'] as const;
export type PaymentService = typeof PAYMENT_SERVICES[number];
export function paymentEstimate(amount: number, currency: 'RUB' | 'CNY') {
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) return null;
  const rub = currency === 'RUB' ? amount : amount * PAYMENT_RATE;
  return { rub, cny: rub / PAYMENT_RATE, valid: rub >= 5000 };
}
export const TRANSPORT = {
  road: { title: 'Авто', days: '18–25', rate: 3.6, factor: 200 },
  rail: { title: 'Ж/д', days: '25–35', rate: 2.7, factor: 250 },
  air: { title: 'Авиа', days: '5–10', rate: 9.5, factor: 167 },
} as const;
export type CargoInput = { weight: number; volume: number; value: number; packages: number; transport: keyof typeof TRANSPORT; category: 'general'|'clothes'|'electronics'; packing: 'standard'|'crate'|'pallet'; insurance: boolean; inspection: boolean; destination: 'moscow'|'spb'|'other' };
export const DEFAULT_CARGO: CargoInput = { weight: 100, volume: 0.5, value: 1000, packages: 4, transport: 'road', category: 'general', packing: 'standard', insurance: true, inspection: false, destination: 'moscow' };
export function calculateCargo(input: CargoInput) {
  const {weight,volume,value,packages} = input;
  if (![weight,volume,value,packages].every(Number.isFinite) || weight <= 0 || weight > 100000 || volume <= 0 || volume > 1000 || value < 0 || value > 10000000 || packages < 1 || packages > 10000 || !Number.isInteger(packages) || !TRANSPORT[input.transport] || !['general','clothes','electronics'].includes(input.category) || !['standard','crate','pallet'].includes(input.packing) || !['moscow','spb','other'].includes(input.destination)) return null;
  const route = TRANSPORT[input.transport];
  const volumeWeight = volume * route.factor;
  const chargeable = Math.max(weight, volumeWeight);
  const factor = input.category === 'electronics' ? 1.2 : input.category === 'clothes' ? 1.05 : 1;
  const freight = chargeable * route.rate * factor;
  const packing = input.packing === 'crate' ? Math.max(25,volume*70) : input.packing === 'pallet' ? Math.ceil(volume)*30 : packages*2;
  const insurance = input.insurance ? value*0.02 : 0;
  const inspection = input.inspection ? packages*3 : 0;
  const destination = input.destination === 'spb' ? 45 : 0;
  const total = freight + packing + insurance + inspection + destination;
  return { volumeWeight, chargeable, density:weight/volume, freight, packing, insurance, inspection, destination, total, rate:route.rate*factor, days:route.days, regional:input.destination==='other' };
}
