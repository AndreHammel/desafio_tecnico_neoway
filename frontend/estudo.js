
const dados = '2022-04-03T21:44:05.263Z'
const opt = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}
const data = new Date(dados).toLocaleDateString('pt-br', opt)

console.log(data)