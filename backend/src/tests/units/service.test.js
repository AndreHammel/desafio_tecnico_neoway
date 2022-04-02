require('dotenv').config()
const { describe, it, before, after, afterEach, beforeEach } = require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')

const model = require('../../models')
const service = require('../../services')

const seed = require('../mock_body')

const mockReturnRegister = {
  acknowledged: true,
  insertedId: '62471f367cd3fa84a6c3984f'
}
const mockReturnSearchByNumber = {
  _id: '62472891df7b13c78f5d41c1',
  docNumber: '15974249003',
  blockList: false,
  type: 'cpf'
}

describe('Teste da camada Service', () => {
  describe('1 - resultado quando cadastro é efetuado pela função "register"', () => {
    before(() => sinon.stub(model, 'register').resolves(mockReturnRegister))
    after(() => model.register.restore())

    it('1.1 - deve retornar um objeto', async () => {
      const response = await service.register(seed.bodyOK)
      expect(response.acknowledged).to.be.an('boolean')
    })
  })
  describe('2 - resultado quando busca é efetuado pela função "search"', () => {
    beforeEach(() => sinon.stub(model, 'searchByNumber').resolves(mockReturnSearchByNumber))
    afterEach(() => model.searchByNumber.restore())

    it('2.1 - deve retornar um objeto quando o documento existe no banco de dados', async () => {
      const response = await service.search(seed.bodyValidCpfAlreadyInBD)
      expect(response).to.be.an('array')
    })
    it('2.2 - deve retornar um objeto quando o documento existe no banco de dados', async () => {
      const response = await service.search(seed.bodyValidCpfAlreadyInBD)
      expect(response[ 0 ].docNumber).to.be.equals(seed.bodyValidCpfAlreadyInBD.docNumber)
    })
    it('2.3 - deve retornar um objeto quando o documento existe no banco de dados', async () => {
      const response = await service.search(seed.bodyValidCpfAlreadyInBD)
      expect(response[ 0 ].docNumber).to.be.equals(seed.bodyValidCpfAlreadyInBD.docNumber)
    })
  })
  describe('3 - resultado quando busca é efetuado pela função "search"', () => {
    beforeEach(() => sinon.stub(model, 'searchGetAll').resolves(9))
    afterEach(() => model.searchGetAll.restore())

    it('3.1 - deve retornar todos documentos', async () => {
      const response = await service.search(seed.searchByAllDocs)
      expect(response).to.be.equals(9)
    })
  })
  describe('4 - resultado quando busca é efetuado pela função "search"', () => {
    beforeEach(() => sinon.stub(model, 'searchGetAll').resolves(5))
    afterEach(() => model.searchGetAll.restore())

    it('4.1 - deve retornar todos documentos que estão marcados como blockList', async () => {
      const response = await service.search(seed.searchByCpfBlockList)
      expect(response).to.be.equals(5)
    })
  })
  describe('5 - resultado quando busca é efetuado pela função "search"', () => {
    beforeEach(() => sinon.stub(model, 'searchGetAll').resolves(3))
    afterEach(() => model.searchGetAll.restore())

    it('5.1 - deve retornar todos documentos do tipo cpf', async () => {
      const response = await service.search(seed.searchByCpf)
      expect(response).to.be.equals(3)
    })
  })
  describe('6 - resultado quando busca é efetuado pela função "search"', () => {
    beforeEach(() => sinon.stub(model, 'searchGetAll').resolves(2))
    afterEach(() => model.searchGetAll.restore())

    it('6.1 - deve retornar todos documentos do tipo cpf que estão no blockList', async () => {
      const response = await service.search(seed.searchByCpfBlockList)
      expect(response).to.be.equals(2)
    })
  })
  describe('7 - resultado quando é modificado o status do blockList do documento', () => {
    beforeEach(() => {
      sinon.stub(model, 'searchByNumber').resolves(true)
      sinon.stub(model, 'changeBlockListStatus').resolves({ modifield: 1 })
    })
    afterEach(() => model.changeBlockListStatus.restore())

    it('7.1 - deve retornar um objeto com a chave modifield igual a 1', async () => {
      const { docNumber, blockList } = seed.searchByDocNumber
      const response = await service.changeBlockListStatus(docNumber, blockList)
      expect(response).to.be.deep.equals({ modifield: 1 })
    })
  })
  describe('8 - resultado quando removido o documento', () => {
    beforeEach(() => {
      sinon.stub(model, 'remove').resolves({ modifield: 1 })
    })
    afterEach(() => model.remove.restore())

    it('8.1 - deve retornar um objeto com a chave modifield igual a 1', async () => {
      const { docNumber } = seed.searchByDocNumber
      const response = await service.remove(docNumber)
      expect(response).to.be.deep.equals({ modifield: 1 })
    })
  })
})
