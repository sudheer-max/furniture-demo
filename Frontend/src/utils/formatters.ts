import { Currency } from '../types';

export function formatPrice(amountEUR: number, currency: Currency): string {
  switch (currency) {
    case 'INR': {
      // Exchange rate benchmark from screenshot: €1,650 is ₹1,48,000 (~89.7 INR/EUR)
      const inr = Math.round(amountEUR * 89.697);
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(inr);
    }
    case 'USD': {
      const usd = Math.round(amountEUR * 1.08);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(usd);
    }
    case 'EUR':
    default:
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(amountEUR);
  }
}

export function formatDualPrice(amountEUR: number): { primary: string; secondary: string } {
  // Exactly matches the screenshot dual-tag presentation: "₹1,48,000 / €1,650"
  const inr = Math.round(amountEUR * 89.697);
  const formattedINR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inr);

  const formattedEUR = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amountEUR);

  return {
    primary: formattedINR,
    secondary: formattedEUR
  };
}
