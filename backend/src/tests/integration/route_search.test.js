require('dotenv').config()
const { describe, it, before, after } = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const { MongoClient } = require('mongodb')

const server = require('./../../app')
const { getConnection } = require('../connectionMock')

const { expect } = chai

const url = '/cpf-cnpj-manager/search'

chai.use(chaiHttp)

const mockDB = require('./../mock_db')
const seed = require('./../mock_body')
const expectedReturn = require('./../expect_return')

const { DATABASE, COLLECTION } = process.env

describe('Teste endpoint POST /search', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    await MongoClient.connect.restore()
  })

  describe(`1 - Quando feita a requisição com body sem número de documento, sem tipo específico
                e sem filtro de blockList `, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByAllDocs)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 9', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedSearchAll)
    })
  })

  describe('2 - Quando feita a requisição com body COM número de documento e cadastro existe o banco de dados', () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByDocNumber)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 1', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedSearchByDocNumber)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })

    it('deve ter valor igual "15974249003" a na chave docNumber', () => {
      expect(response.body[ 0 ]).to.have.property('docNumber', seed.searchByDocNumber.docNumber)
    })
  })
  describe(`3 - Quando feita a requisição com body SEM número de documento, cadastro SOMENTE de CPF
            e trazendo todos que estão no blockList ou não.`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByCpf)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 5', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedNumberCPFs)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })
  })
  describe(`4 - Quando feita a requisição com body SEM número de documento, cadastro SOMENTE de CPF
  e trazendo SOMENTE CPF que estnão no blockList.`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByCpfBlockList)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 3', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedNumberCPFBlocklist)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })
  })
  describe(`5 - Quando feita a requisição com body SEM número de documento, cadastro SOMENTE de CNPJ
  e trazendo todos que estão no blockList ou não.`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByCnpj)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 4', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedNumberCNPJs)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })
  })
  describe(`6 - Quando feita a requisição com body SEM número de documento, cadastro SOMENTE de CNPJ
e trazendo SOMENTE CPF que estnão no blockList.`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByCnpjBlockList)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 2', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedNumberCNPJBlocklist)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })
  })
  describe(`7 - Quando feita a requisição com body SEM número de documento, sem tipo de documento definido
  e trazendo SOMENTE documentos no blockList (cpf & cnpj).`, () => {
    let response
    before(async () => {
      const task = await connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertMany(mockDB)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.searchByAllDocsBlockList)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 200', () => {
      expect(response).to.have.status(200)
    })

    it('deve ter um retorno de um array de tamanho igual a 5', () => {
      expect(response.body.length).to.be.equal(expectedReturn.expectedAllBlockListDocuments)
    })

    it('deve ter chaves igual a "_id, docNumber, blockList, type"', () => {
      expect(response.body[ 0 ]).to.have.keys(expectedReturn.keys)
    })
  })
})
