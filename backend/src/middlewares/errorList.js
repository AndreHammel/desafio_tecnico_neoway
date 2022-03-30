const statusCode = require('http-status-codes').StatusCodes;

const INVALID_CPF_CNPJ = {
  code: statusCode.BAD_REQUEST,
  message: 'CPF or CNPJ inválidos',
};

const BAD_REQUEST_ID = {
  code: statusCode.BAD_REQUEST,
  message: 'Must be a valid id',
};

module.exports = {
  INVALID_CPF_CNPJ,
  BAD_REQUEST_ID,
};