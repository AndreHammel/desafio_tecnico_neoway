function calculationFactorCPF(value, factor) {
  return value * 10 % 11 === factor
}

function validateCPF(cpf) {
  if (cpf.length != 11) return false
  let ARRAY_DIGITS = [ 10, 9, 8, 7, 6, 5, 4, 3, 2 ]

  const array_numbers_cpf = String(cpf)
    .split('')
    .map(item => Number(item))

  const firstFactor = array_numbers_cpf[ 9 ]
  const secondFactor = array_numbers_cpf[ 10 ]

  let value = 0;
  for (let i in ARRAY_DIGITS) {
    value += array_numbers_cpf[ i ] * ARRAY_DIGITS[ i ]
  }
  const firstValidation = calculationFactorCPF(value, firstFactor)

  value = 0
  ARRAY_DIGITS = ARRAY_DIGITS.concat([ 1 ])
  for (let i in ARRAY_DIGITS) {
    value += array_numbers_cpf[ i ] * (ARRAY_DIGITS[ i ] + 1)
  }
  const secondValidation = calculationFactorCPF(value, secondFactor)

  return firstValidation && secondValidation
}

module.exports = validateCPF