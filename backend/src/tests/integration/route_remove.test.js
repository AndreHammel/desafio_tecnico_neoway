require('dotenv').config()
const { describe, it, before, after } = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const { MongoClient } = require('mongodb')

const server = require('./../../app')
const { getConnection } = require('../connectionMock')

const { expect } = chai

const url = '/cpf-cnpj-manager/remove'

chai.use(chaiHttp)

const mockDB = require('./../mock_db')
const seed = require('./../mock_body')
const expectedReturn = require('./../expect_return')

const { DATABASE, COLLECTION } = process.env

describe('Teste endpoint DELETE /remove', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    await MongoClient.connect.restore()
  })

  describe(`1 - Quando feita a requisição com body COM número de documento o documento
                deve ser removido do bando de dados`, () => {
    let response
    let dbRemainDocs
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .delete(`${ url }`)
        .send(seed.docNumberToBeRemoved)
      dbRemainDocs = await task.estimatedDocumentCount()
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })
    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno deve ser um objeto com chave "message"', () => {
      expect(response.body).to.be.property('message')
    })

    it('deve ter uma mensagem de retorno igual "cpf/cnpj removido"', () => {
      expect(response.body.message).to.be.equals('cpf/cnpj removido')
    })

    it('deve ter um número de documentos igual a 8 no banco de dados após remoção"', () => {
      expect(dbRemainDocs).to.be.equal(expectedReturn.expectedNumberDocsRemainDB)
    })
  })
  describe(`2 - Quando feita a requisição com body COM número de documento o documento
            não existir no banco de dados`, () => {
    let response
    let dbRemainDocs
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .delete(`${ url }`)
        .send(seed.docNumberToBeRemovedThatNotExists)
      dbRemainDocs = await task.estimatedDocumentCount()
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })
    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno deve ser um objeto com chave "message"', () => {
      expect(response.body).to.be.property('message')
    })

    it('deve ter uma mensagem de retorno igual "Número de documento não encontrado"', () => {
      expect(response.body.message).to.be.equals('Número de documento não encontrado')
    })

    it('deve ter um número de documentos igual a 9 no banco de dados após a tentativa remoção"', () => {
      expect(dbRemainDocs).to.be.equal(expectedReturn.expectedNumberDocsInDB)
    })
  })
})
