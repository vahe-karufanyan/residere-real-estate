export const arrPriceRanges = [
  "0-100000",
  "100000-200000",
  "200000-300000",
  "300000-400000",
  "400000-999999999999"
]

export const priceRangeToIndex = (priceRange: string) => {
 const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

 return index
}