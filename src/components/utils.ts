export function generateMonthOptions(): number[] {
  return Array(12)
    .fill(null)
    .map((v, i) => i + 1)
}

export function generateYearsOptions(): number[] {
  const d = new Date().getFullYear()

  return Array(11)
    .fill(null)
    .map((v, i) => i + d)
}
