export const formatCurrency = (value: string | number) => {
  if (!value) return ""
  const numberValue = Number(value)

  return numberValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
