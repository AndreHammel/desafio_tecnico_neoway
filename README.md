# ![neo-way](https://user-images.githubusercontent.com/54488551/161454111-58794b8a-5d48-4178-af60-207d1652f631.jpg)

Tabela de conteúdos
=================
<!--ts-->
  * [Tecnologias Utilizada](#tecnologias-utilizadas)
  * [Motivação & Objetivos](#Motivação--Objetivos)
  * [Requisitos](#Requisitos)
  * [Interface](#Interface)
  * [Como instalar](#como-instalar)
    * [Download](#download)
    * [Iniciar o projeto](#iniciar-o-projeto)
    * [Iniciar o servidor](#iniciar-o-servidor)
    * [Iniciar o cliente](#iniciar-o-cliente)
  * [Utilizando os teste](#utilizando-os-teste)
    * [Back-end](#back-end)
      * [Taxa de cobertura back-end](#taxa-de-cobertura-back-end)
    * [Front-end](#front-end)
      * [Taxa de cobertura front-end](#taxa-de-cobertura-front-end)
  * [Lista de dependencias](#lista-de-dependencias)
    * [Back-end](#back-end)
    * [Front-end](#front-end)
  * [Links & Detalhes](#links--detalhes)
    * [Deploy Front-end](#deploy-front-end)
    * [Deploy Back-end](#deploy-front-end)
    * [Backend endpoints](#backend-endpoints)
<!--te-->
## Tecnologias Utilizadas
<div style="display: inline-block" align="left"><br>
  <img align="center" alt="js" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
  <img align="center" alt="css" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
  <img align="center" alt="html" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
  <img align="center" alt="react" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
  <img align="center" alt="react" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" />
  <img align="center" alt="react" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"  />
  <img align="center" alt="react" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"/>
  <img align="center" alt="react" height="50" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"/>
</div>


## Motivação & Objetivos

  A aplicação __fullstack__ tem o objetivo de fazer o gerenciamento de CPF/CNPJ, na interface deve ser possível incluir somente CPF/CNPJ válidos, a remoção do cadastro do banco de dados, além disso deve ser possível incluir o cadastro numa *blocklist*, sendo necessário também a opção de alterar a inclusão deste na *blocklist*, a ordenação e filtragem também são caracteristicas da aplicação.

## Requisitos
1. Validação do número do CPF/CNPJ (usando algoritmo matemático[<sup>1</sup>])
2. Front-end deve ser uma SPA
3. Back-end deve obedecer o padrão REST
4. Back-end deve conter um endpoint (/status) que informa o up-time do servidor
5. O endpoint /status também deve informar quantas vezes cada endpoint do servidor foi acessado
6. Dados devem ser armazenados no MongoDB ou PostgreSQL
7. Deve pode filtrar os cadastras por:
  7.1 que estão no *blocklist*
  7.2 pelo tipo de documento (cpf ou cnpj)
8. Deve poder retornar todos os cadastros
9. Não deve permitir que sejá cadastrado um documento que já existe no bando de dados
10. Quando feita a tentativa de cadastro de número existe deve informar o usuário
11. Não deve permitir o cadastro de número com caracteres como ponto, hífen, barra e nem espaço
12. Quando usuário tentar fazer cadastro número com caracteres deve ser informado

<sup>1</sup> A validação do CPF e CNPJ foi baseada no algoritmo matemático, os links das fontes [Validação CPF](https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/), [Validação CNPJ](https://www.macoratti.net/alg_cnpj.htm)

## Interface
![new-print](https://user-images.githubusercontent.com/54488551/161455121-debc0a72-d4b6-44c8-b1c2-b6dcf2b70dc6.png)

## Como utilizar

## Download

```sh
git clone git@github.com:AndreHammel/desafio_tecnico_neoway.git
```

```sh
cd desafio_tecnico_neoway
```

### Iniciar o projeto

```sh
npm run dev:prestart
```

### Iniciar o servidor
- fazer após 'Iniciar o projeto'

```sh
$ npm start
```

### Iniciar o cliente
- fazer após 'Iniciar o servidor'

```sh
$ npm start
```

## Utilizando os teste

### Back-end

```sh
cd backend
```

## Teste unitário

```sh
npm run test:units
```

## Teste integração

```sh
npm run test:integration
```

## Verificar da cobertura

```sh
npm run test:coverage
```

### Front-end

```sh
$ cd frontend
```

```sh
$ npm run test
```

#### Taxa de cobertura front-end

```sh
$ npm run test -- --coverage
```


## Lista de dependencias

### Back-end

* cors: 2.8.5
* dotenv: 16.0.0
* eslint-config-trybe-backend: 1.0.4
* express: 4.17.2
* http-status-codes: 2.2.0
* moment: 2.29.1
* mongodb: 4.3.1

### Front-end

* @mui/material: 5.4.1
* axios: 0.25.0
* prop-types: 15.8.1
* react: 17.0.2
* react-dom: 17.0.2
* react-icons: 4.3.1
* react-scripts: 5.0.0
* styled-components: 5.3.3


#### Backend endpoints

```
backend endpoints
│
└─── retorna os log do servidor:  /cpf-cnpj-manager/log-server
│
└─── remove o documento: /cpf-cnpj-manager/remove
│
└─── muda o status do blockList do documento - booleano: /cpf-cnpj-manager/change-status
│
└─── busca documento no bando de dados: /cpf-cnpj-manager/search
│
└─── cadastro o documento: /cpf-cnpj-manager/register
│
└─── verifica se servidor está ativo: /cpf-cnpj-manager/ping
```
