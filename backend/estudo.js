const kvArray = [ [ '/cpf-cnpj-manager/ping', 0 ] ]

const stats = new Map(kvArray)

const route = '/cpf-cnpj-manager/ping'

stats.set(route, stats.get(route) + 1)

console.log(JSON.stringify(Object.fromEntries(stats)))

// let map = new Map();
// map.set("a", { val: 1 });

// console.log(map)