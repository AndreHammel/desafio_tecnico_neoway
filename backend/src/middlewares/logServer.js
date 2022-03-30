function getRoute(req) {
  const route = req.route ? req.route.path : ''
  const baseUrl = req.baseUrl ? req.baseUrl : ''

  return route ? `${ baseUrl === '/' ? '' : baseUrl }${ route }` : 'unknown route'
}

const kvArray = [
  [ '/cpf-cnpj-manager/ping', 0 ],
  [ '/cpf-cnpj-manager/log-server', 0 ],
  [ '/cpf-cnpj-manager/remove', 0 ],
  [ '/cpf-cnpj-manager/change-status', 0 ],
  [ '/cpf-cnpj-manager/search', 0 ],
  [ '/cpf-cnpj-manager/register', 0 ],
]
const stats = new Map(kvArray)

module.exports = (req, res, next) => {
  res.on("finish", () => {
    const routeRequested = getRoute(req)
    stats.set(routeRequested, stats.get(routeRequested) + 1)
  })
  res.locals.stats = stats
  next()
}