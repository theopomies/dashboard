export function formatBigNumber(n: number, dec?: number): string {
  if (n < 1000) return "" + n;
  if (n < 1000000) return (n / 1000).toFixed(dec ?? 3) + "k";
  return (n / 1000000).toFixed(dec ?? 3) + "m";
}
