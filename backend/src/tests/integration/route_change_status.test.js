require('dotenv').config()
const { describe, it, before, after } = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const { MongoClient } = require('mongodb')

const server = require('./../../app')
const { getConnection } = require('../connectionMock')

const { expect } = chai

const url = '/cpf-cnpj-manager/change-status'

chai.use(chaiHttp)

const mockDB = require('./../mock_db')
const seed = require('../mock_body')

const { DATABASE, COLLECTION } = process.env

describe('Teste endpoint PUT /change-status', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    await MongoClient.connect.restore()
  })

  describe(`1 - Quando feita a requisição com body COM número de documento o status do
        blockList deve ser alterado para o valor oposto, se true deve mudar para false
        e vice-versa`, () => {
    let response
    let afterChange
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .put(`${ url }`)
        .send(seed.docNumberToBeStatusChange)
      afterChange = await task.findOne(seed.docNumberToBeStatusChange)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })
    it('deve retorna status 202', async () => {
      expect(response).to.have.status(202)
    })

    it('deve retorna um json com chave "message"', async () => {
      expect(response.body).to.have.property('message')
    })

    it('deve retorna a messagem igual "Status do BlockList do documento alterado"', async () => {
      expect(response.body.message).to.have.equal('Status do BlockList do documento alterado')
    })

    it('deve retorna status com o valor oposto do banco de dados', async () => {
      expect(afterChange.blockList).to.be.equals(true)
    })
  })
  describe(`2 - Quando feita a requisição com body COM número de documento que
        não exite no bando de dados`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .put(`${ url }`)
        .send(seed.docNumberInvalidToBeStatusChange)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })
    it('deve retorna status 400', async () => {
      expect(response).to.have.status(400)
    })

    it('deve retorna um json com chave "message"', async () => {
      expect(response.body).to.have.property('message')
    })

    it('deve retorna a messagem igual "Documento não encontrado"', async () => {
      expect(response.body.message).to.have.equal('Documento não encontrado')
    })
  })
})
