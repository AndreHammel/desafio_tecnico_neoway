const { describe, after, it, before } = require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')

const controller = require('../../controllers')
const service = require('../../services')
const middlewareError = require('../../middlewares/error')

const seed = require('../mock_body')

describe('Teste da camada de Controller', () => {
  describe('1 - Resultado quando cadastra um novo documento e ele não existe no banco de dados', () => {
    const request = {}
    const response = {}
    let next

    before(() => {
      request.body = seed.bodyOK
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Cadastro criado com sucesso' })
      sinon.stub(service, 'search').resolves([])
      sinon.stub(service, 'register').resolves([])
      next = (error) => middlewareError(error, request, response)
    })

    after(() => {
      service.search.restore()
      service.register.restore()
    })

    it('1.1 - deve retornar a  resposta com status HTTP 201', async function () {
      await controller.register(request, response, next)
      expect(response.status.calledWith(201)).to.be.equal(true)
    })

    it('1.2 - deve retorna um objeto', async function () {
      await controller.register(request, response, next)
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('1.3 - deve retorna uma mensagem: "Cadastro criado com sucesso"', async function () {
      await controller.register(request, response, next)
      expect(response.json()).to.be.deep.equals({ message: 'Cadastro criado com sucesso' })
    })
  })
  describe('2 - Resultado quando cadastra um novo documento e ele JÁ existe no banco de dados', () => {
    const request = {}
    const response = {}
    let next

    before(() => {
      request.body = seed.bodyOK
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Número de CPF/CNPJ já cadastrado' })
      sinon.stub(service, 'search').resolves([ 1 ])
      next = (error) => middlewareError(error, request, response)
    })

    after(() => {
      service.search.restore()
    })

    it('2.1 - deve retornar a  resposta com status HTTP 400', async function () {
      await controller.register(request, response, next)
      expect(response.status.calledWith(400)).to.be.equal(true)
    })

    it('2.2 - deve retorna um objeto', async function () {
      await controller.register(request, response, next)
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

    it('2.3 - deve retorna um mensagem : "Número de CPF/CNPJ já cadastrado"', async function () {
      await controller.register(request, response, next)
      expect(response.json()).to.be.deep.equals({ message: 'Número de CPF/CNPJ já cadastrado' })
    })
  })
  describe('3 - Resultado da busca pelo documento no banco de dados', () => {
    const request = {}
    const response = {}
    let next

    before(() => {
      request.body = seed.searchByCpf
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns([ seed.searchByCpf ])
      sinon.stub(service, 'search').resolves([])
      next = (error) => middlewareError(error, request, response)
    })

    after(() => {
      service.search.restore()
    })

    it('3.1 - deve retornar a  resposta com status HTTP 200', async function () {
      await controller.search(request, response, next)
      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('3.2 - deve retorna um array', async function () {
      await controller.register(request, response, next)
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('3.3 - deve retorna um mensagem : "Número de CPF/CNPJ já cadastrado"', async function () {
      await controller.register(request, response, next)
      expect(response.json()).to.be.deep.equals([ seed.searchByCpf ])
    })
  })
})
