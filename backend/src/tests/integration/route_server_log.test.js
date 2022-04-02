require('dotenv').config()
const { describe, it, before } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('./../../app')
const { expect } = chai
chai.use(chaiHttp)

const URL = '/cpf-cnpj-manager/log-server'

describe('Teste endpoint GET /log-server', () => {
  describe('1 - Quando feita a requisição retorna o log do servidor ', () => {
    let response
    before(async () => {
      response = await chai.request(server).get(`${ URL }`)
    })

    it('deve retorna status 200', async () => {
      expect(response).to.have.status(200)
    })
  })

  describe('2 - Quando feita a requisição retorna o log do servidor ', () => {
    let response
    before(async () => {
      await chai.request(server).get('/cpf-cnpj-manager/ping')
      await chai.request(server).delete('/cpf-cnpj-manager/remove')
      await chai.request(server).put('/cpf-cnpj-manager/change-status')
      await chai.request(server).post('/cpf-cnpj-manager/search')
      await chai.request(server).post('/cpf-cnpj-manager/register')
      response = await chai.request(server).get(`${ URL }`)
    })

    it('deve retorna status 200', async () => {
      expect(response).to.have.status(200)
    })
    it('deve ter número de requisições de cada endpoint igual a 1', async () => {
      response.body.stats.forEach(item => {
        expect(item.count).to.be.gt(0)
      })
    })
  })
  describe('3 - Quando feita a requisição retorna o log do servidor ', () => {
    let response
    before(async () => {
      response = await chai.request(server).get(`${ URL }`)
    })
    it('deve retornar status 200', async () => {
      expect(response).to.have.status(200)
    })
    it('deve o retorno deve ter as chaves "uptime", "message", "date"', async () => {
      expect(response.body.data).to.have.keys([ 'uptime', 'message', 'date' ])
    })
    it('deve o retorno a data igual a data atual', async () => {
      const dateServerOn = response.body.data.date
      expect(new Date(dateServerOn).toLocaleDateString('pt-br'))
        .to.be.equals(new Date().toLocaleDateString('pt-br'))
    })
  })
})
