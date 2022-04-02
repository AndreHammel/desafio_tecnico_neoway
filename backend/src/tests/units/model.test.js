require('dotenv').config()
const { describe, it, before, after, afterEach, beforeEach } = require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const model = require('../../models')
const { getConnection } = require('../connectionMock')

const { DATABASE, COLLECTION } = process.env
const seed = require('../mock_body')
const mockDB = require('../mock_db')
const expectedReturn = require('../expect_return')

describe('Teste da camada Model', () => {
  let connectionMock

  before(async function () {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async function () {
    await MongoClient.connect.restore()
  })

  describe('1 - resultado quando cadastro é efetuado pela função "register"', () => {
    afterEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteMany({}))

    it('1.1 - deve retornar um objeto', async () => {
      const response = await model.register(seed.bodyOK)
      expect(response).to.be.an('object')
    })
    it('1.2 - precisa retorna um objeto com as chaves "acknowledged", "insertedId"', async () => {
      const response = await model.register(seed.bodyOK)
      expect(response).to.include.all.keys('acknowledged', 'insertedId')
    })
  })

  describe('2 - resultado quando a busca é efetuado pela função "searchByNumber"', () => {
    beforeEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .insertMany(mockDB))

    afterEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteMany({}))

    it('2.1 - deve retornar um objeto quando o documento está já cadastrado no banco de dados', async () => {
      const response = await model.searchByNumber(seed.docNumberExistsDB)
      expect(response).to.be.an('object')
    })
    it('2.2 - precisa retorna um objeto com as chaves "_id", "docNumber", "blockList", "type"', async () => {
      const response = await model.searchByNumber(seed.docNumberExistsDB)
      expect(response).to.include.all.keys('_id', 'docNumber', 'blockList', 'type')
    })
    it('2.3 - deve retornar um objeto quando o documento está NÃO cadastrado no banco de dados', async () => {
      const response = await model.searchByNumber(seed.docNumberNOTExistsDB)
      expect(response).to.be.equals(null)
    })
  })
  describe('3 - resultado quando a busca é efetuado pela função "searchGetAll"', () => {
    beforeEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .insertMany(mockDB))

    afterEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteMany({}))

    it('3.1 - deve retornar todos os documentos quando o recebe {} ', async () => {
      const response = await model.searchGetAll({})
      // console.log(response.length)
      expect(response.length).to.be.equals(expectedReturn.expectedSearchAll)
    })
    it('3.2 - deve retornar somente documentos marcados como blockList ', async () => {
      const response = await model.searchGetAll({ blockList: true })
      expect(response.length).to.be.equals(expectedReturn.expectedAllBlockListDocuments)
    })
    it('3.3 - deve retornar somente documentos marcados como blockList e cpf', async () => {
      const response = await model.searchGetAll({ type: 'cpf', blockList: true })
      expect(response.length).to.be.equals(expectedReturn.expectedNumberCPFBlocklist)
    })
    it('3.4 - deve retornar somente documentos marcados como blockList e cnpj', async () => {
      const response = await model.searchGetAll({ type: 'cnpj', blockList: true })
      expect(response.length).to.be.equals(expectedReturn.expectedNumberCNPJBlocklist)
    })
    it('3.5 - deve retornar somente documentos do tipo cpf', async () => {
      const response = await model.searchGetAll({ type: 'cpf' })
      expect(response.length).to.be.equals(expectedReturn.expectedNumberCPFs)
    })
    it('3.6 - deve retornar somente documentos do tipo cnpj', async () => {
      const response = await model.searchGetAll({ type: 'cnpj' })
      expect(response.length).to.be.equals(expectedReturn.expectedNumberCNPJs)
    })
  })
  describe('4 - resultado quando a quando feita a mudança do status do blockList do documento', () => {
    beforeEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .insertMany(mockDB))

    afterEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteMany({}))

    it('4.1 - deve mudar o status do blockList', async () => {
      const response = await model.changeBlockListStatus(seed.docNumberExistsDB.docNumber, false)
      expect(response).to.be.an('object')
    })
    it('4.2 - precisa retorna um objeto com as chave modifiedCount igual a 1', async () => {
      const response = await model.changeBlockListStatus(seed.docNumberExistsDB.docNumber, false)
      expect(response.modifiedCount).to.be.equals(1)
    })
  })
  describe('5 - resultado quando a quando feita a remoção do cadastro no banco de dados', () => {
    let NumberDocumentsBeforeRemoveOne
    let task
    beforeEach(async () => {
      task = await connectionMock
        .db(DATABASE)
        .collection(COLLECTION)
      await task.insertMany(mockDB)
      NumberDocumentsBeforeRemoveOne = await task.count()
    })

    afterEach(async () => connectionMock
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteMany({}))

    it('5.1 - deve retornar um objeto', async () => {
      const response = await model.remove(seed.docNumberExistsDB.docNumber)
      expect(response).to.be.an('object')
    })
    it('5.2 - precisa retorna um objeto com as chave deletedCount igual a 1', async () => {
      const response = await model.remove(seed.docNumberExistsDB.docNumber)
      expect(response.deletedCount).to.be.equals(1)
    })
    it('5.3 - deve ter reduzido em 1 unidade o número de documentos dentro do banco de dados', async () => {
      await model.remove(seed.docNumberExistsDB.docNumber)
      expect(NumberDocumentsBeforeRemoveOne).to.be.equals(await task.count() + 1)
    })
  })
})
