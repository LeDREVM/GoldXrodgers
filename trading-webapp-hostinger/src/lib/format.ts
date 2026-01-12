// Formatting utility functions
export function fmtNumber(n: number | null | undefined, digits = 2): string {
    if (n === null || n === undefined || Number.isNaN(n)) return "—";
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(n);
  }
  
  export function fmtPct(n: number | null | undefined, digits = 1): string {
    if (n === null || n === undefined || Number.isNaN(n)) return "—";
    return `${fmtNumber(n * 100, digits)}%`;
  }
  