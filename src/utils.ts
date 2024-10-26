export function generateAvailableMonths() {
  return Array(12)
    .fill(null)
    .map((v, index) => `${index + 1}`.padStart(2, '0'))
}

export function generateAvailableYears() {
  const currentYear = new Date().getFullYear()

  return Array(10)
    .fill(null)
    .map((_v, index) => `${currentYear + index}`)
}
