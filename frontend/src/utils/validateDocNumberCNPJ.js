function calculationFactorCNPJ(value, firstFactor) {
  const factor = value % 11 < 2 ? 0 : 11 - value % 11
  return factor === firstFactor
}

export default function validateCNPJ(cnpj) {
  if (cnpj.length !== 14) return false
  let GROUP_1 = [ 5, 4, 3, 2 ]
  const GROUP_2 = [ 9, 8, 7, 6, 5, 4, 3, 2 ]
  const arrayNumberCNPJ = cnpj
    .split('')
    .map(item => Number(item))

  const firstFactor = arrayNumberCNPJ[ 12 ]
  const secondFactor = arrayNumberCNPJ[ 13 ]

  let value = 0
  const FIRST_GROUP = GROUP_1.concat(GROUP_2)
  for (const i in FIRST_GROUP) {
    value += FIRST_GROUP[ i ] * arrayNumberCNPJ[ i ]
  }
  const firstValidation = calculationFactorCNPJ(value, firstFactor)

  value = 0
  GROUP_1 = GROUP_1.concat([ 1 ]).map(element => element + 1)
  const SECOND_GROUP = GROUP_1.concat(GROUP_2)
  for (const i in SECOND_GROUP) {
    value += SECOND_GROUP[ i ] * arrayNumberCNPJ[ i ]
  }
  const secondValidation = calculationFactorCNPJ(value, secondFactor)
  return firstValidation && secondValidation
}

