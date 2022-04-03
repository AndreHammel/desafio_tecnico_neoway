const service = require('./../services')
const httpCode = require('http-status-codes').StatusCodes

const ping = (req, res) => {
  res.status(202).json({ message: 'pong' })
}

const register = async (req, res, next) => {
  try {
    const docNumberAlreadyExists = await service.search(req.body)
    if (docNumberAlreadyExists.length !== 0) {
      return res
        .status(httpCode.BAD_REQUEST)
        .json({ message: 'Número de CPF/CNPJ já cadastrado' })
    }
    await service.register(req.body)
    return res.status(httpCode.CREATED)
      .json({ message: 'Cadastro criado com sucesso' })
  } catch (error) {
    next(error)
  }
}

const search = async (req, res, next) => {
  try {
    const result = await service.search(req.body)
    return res.status(httpCode.OK).json(result)
  } catch (error) {
    next(error)
  }
}

const changeBlockListStatus = async (req, res, next) => {
  try {
    const { modifiedCount } = await service.changeBlockListStatus(req.body)
    if (modifiedCount === 1) {
      return res.status(httpCode.ACCEPTED)
        .json({ message: 'Status do BlockList do documento alterado' })
    }
    return res.status(httpCode.BAD_REQUEST).json({ message: 'Documento não encontrado' })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { deletedCount } = await service.remove(req.body)
    if (deletedCount === 1) {
      return res.status(httpCode.OK).json({ message: 'cpf/cnpj removido' })
    }
    return res.status(httpCode.OK).json({ message: 'Número de documento não encontrado' })
  } catch (error) {
    next(error)
  }
}

const logServer = async (req, res, next) => {
  try {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    const stats = [ ...res.locals.stats ]
      .map(item => ({ url: item[ 0 ], count: item[ 1 ] }))
    return res.status(httpCode.OK).json({ stats, data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ping,
  register,
  search,
  changeBlockListStatus,
  remove,
  logServer
}
