const service = require('./../services')

const ping = (req, res) => {
  res.send('pongolitozinho')
}

const register = async (req, res, next) => {
  try {
    const result = await service.register(req.body)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const search = async (req, res, next) => {
  try {
    const result = await service.search(req.body)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const changeBlockListStatus = async (req, res, next) => {
  try {
    const result = await service.changeBlockListStatus(req.body)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await service.remove(req.body)
    return res.status(200).json(result)
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
    const stats = Object.fromEntries(res.locals.stats)
    return res.status(200).json({ stats, data })
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
  logServer,
}
