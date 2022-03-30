const validateCPF = require('../utils/validateCPF')
const validateCNPJ = require('../utils/validateCNPJ')
const { INVALID_CPF_CNPJ: { code, message } } = require('./errorList')


const validateCpfCnpj = (req, res, next) => {
  const { type, docNumber } = req.body
  if (/-|\.|\s/g.test(docNumber) || typeof (docNumber) != 'string') {
    return res.status(code).json(message)
  }
  const isValidated = type === "cpf"
    ? validateCPF(docNumber)
    : validateCNPJ(docNumber)
  if (!isValidated) return res.status(code).json(message)
  next()
}

module.exports = validateCpfCnpj