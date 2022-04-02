require('dotenv').config()
const { describe, it, before, after } = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const { MongoClient } = require('mongodb')

const server = require('./../../app')
const { getConnection } = require('../connectionMock')

const { expect } = chai

const url = '/cpf-cnpj-manager/register'

chai.use(chaiHttp)

const seed = require('../mock_body')

const { DATABASE, COLLECTION } = process.env

describe('Teste endpoint POST /register', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    await MongoClient.connect.restore()
  })

  describe('1 - Quando o body da requisição está com valores corretos cpf', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.bodyOK)
    })

    it('deve retorna status 201', () => {
      expect(response).to.have.status(201)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "cadastro feito com sucesso"', () => {
      expect(response.body.message).to.have.equals('Cadastro criado com sucesso')
    })
  })

  describe('2 - Quando o body da requisição vazio', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send({})
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('3 - Quando o body da requisição tem número de documento do tipo cpf com uma letra maiúscula', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfWithLetterUpperCase)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('4 - Quando o body da requisição tem número de documento do tipo cpf com hífen "-"', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfWithHyphen)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('5 - Quando o body da requisição tem número de documento do tipo cpf com ponto "."', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfWithPoint)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('6 - Quando o body da requisição tem número de documento do tipo cpf com ponto espaço', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfWithSpace)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('7 - Quando o body da requisição tem número de documento do tipo cpf é invalido', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withInvalidCpf)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('8 - Quando o body da requisição tem número de documento do tipo cpf quantidade de caracteres é menor', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfWithLetterLowerCase)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('9 - Quando o body da requisição tem número de documento do tipo cpf não é uma string', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfNOTstring)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('10 - Quando o body da requisição tem número de documento do tipo cpf tem número de caracteres deferente de 11', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfLengthBiggerThan11)
    })

    it('deve retorna status 400 quando tamanho do cpf acima de 11', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem quando tamanho do cpf acima de 11', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos" quando tamanho do cpf acima de 11', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })

    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCpfLengthLessThan11)
    })

    it('deve retorna status 400 quando tamanho do cpf menor de 11', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem quando tamanho do cpf menor de 11', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos" quando tamanho do cpf menor de 11', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('11 - Quando o body da requisição tem número de documento do tipo cpf não é uma string', () => {
    let response
    before(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertOne(seed.bodyOK)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.bodyOK)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('Número de CPF/CNPJ já cadastrado')
    })
  })

  describe('12 - Quando o body da requisição está com valores corretos CNPJ', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.bodyOKCnpj)
    })

    it('deve retorna status 201', () => {
      expect(response).to.have.status(201)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "cadastro feito com sucesso"', () => {
      expect(response.body.message).to.have.equals('Cadastro criado com sucesso')
    })
  })

  describe('13 - Quando o body da requisição tem número de documento do tipo CNPJ com uma letra maiúscula', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjWithLetterUpperCase)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('14 - Quando o body da requisição tem número de documento do tipo CNPJ com hífen "-"', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjWithHyphen)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('15 - Quando o body da requisição tem número de documento do tipo CNPJ com ponto "."', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjWithPoint)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('16 - Quando o body da requisição tem número de documento do tipo CNPJ com ponto espaço', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjWithSpace)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('17 - Quando o body da requisição tem número de documento do tipo CNPJ é invalido', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withInvalidCnpj)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('18 - Quando o body da requisição tem número de documento do tipo CNPJ quantidade de caracteres é menor', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjWithLetterLowerCase)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('19 - Quando o body da requisição tem número de documento do tipo CNPJ NÃO é uma string', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjNOTstring)
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('20 - Quando o body da requisição tem número de documento do tipo CNPJ tem número de caracteres deferente de 11', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjLengthBiggerThan14)
    })

    it('deve retorna status 400 quando tamanho do CNPJ acima de 14', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem quando tamanho do CNPJ acima de 14', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos" quando tamanho do CNPJ acima de 14', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })

    before(async () => {
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.withCnpjLengthLessThan14)
    })

    it('deve retorna status 400 quando tamanho do CNPJ menor de 14', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem quando tamanho do CNPJ menor de 14', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos" quando tamanho do CNPJ menor de 14', () => {
      expect(response.body.message).to.have.equals('CPF or CNPJ inválidos')
    })
  })

  describe('21 - Quando o body da requisição tem número de documento do tipo CNPJ não é uma string', () => {
    let response
    before(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION)
      await task.insertOne(seed.bodyOKCnpj)
      response = await chai.request(server)
        .post(`${ url }`)
        .send(seed.bodyOKCnpj)
    })
    after(async () => {
      connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({})
    })

    it('deve retorna status 400', () => {
      expect(response).to.have.status(400)
    })

    it('deve receber uma mensagem', () => {
      expect(response.body).to.have.property('message')
    })

    it('deve receber uma mensagem "CPF or CNPJ inválidos"', () => {
      expect(response.body.message).to.have.equals('Número de CPF/CNPJ já cadastrado')
    })
  })
})
