
module.exports = {

  bodyOK: {
    blocklist: false,
    type: 'cpf',
    docNumber: '30864635036'
  },
  bodyValidCpfAlreadyInBD: {
    blocklist: false,
    type: 'cpf',
    docNumber: '15974249003'
  },
  withCpfWithLetterUpperCase: {
    blocklist: false,
    type: 'cpf',
    docNumber: '0499271009A'
  },
  withCpfWithHyphen: {
    blocklist: false,
    type: 'cpf',
    docNumber: '04992710-90'
  },
  withCpfWithPoint: {
    blocklist: false,
    type: 'cpf',
    docNumber: '0499271.09A'
  },
  withCpfWithSpace: {
    blocklist: false,
    type: 'cpf',
    docNumber: '0499271 09A'
  },
  withCpfWithLetterLowerCase: {
    blocklist: false,
    type: 'cpf',
    docNumber: '0499271009a'
  },
  withInvalidCpf: {
    blocklist: false,
    type: 'cpf',
    docNumber: '04992710090'
  },
  withCpfNOTstring: {
    blocklist: false,
    type: 'cpf',
    docNumber: 49927100907
  },
  withCpfLengthBiggerThan11: {
    blocklist: false,
    type: 'cpf',
    docNumber: '049927100901'
  },
  withCpfLengthLessThan11: {
    blocklist: false,
    type: 'cpf',
    docNumber: '0499271009'
  },
  bodyOKCnpj: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '37342547000185'
  },
  withCnpjWithLetterUpperCase: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '3734254700018A'
  },
  withCnpjWithHyphen: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '37342547000-85'
  },
  withCnpjWithPoint: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '3734254700.185'
  },
  withCnpjWithSpace: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '3734254700 185'
  },
  withCnpjWithLetterLowerCase: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '3734254700018a'
  },
  withInvalidCnpj: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '37342547000000'
  },
  withCnpjNOTstring: {
    blocklist: false,
    type: 'cnpj',
    docNumber: 37342547000185
  },
  withCnpjLengthBiggerThan14: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '373425470001851'
  },
  withCnpjLengthLessThan14: {
    blocklist: false,
    type: 'cnpj',
    docNumber: '3734254700018'
  },
  searchByAllDocs: {
    docNumber: '',
    type: 'all',
    blockList: false
  },
  searchByDocNumber: {
    docNumber: '15974249003',
    type: 'all',
    blockList: false
  },
  searchByCpf: {
    docNumber: '',
    type: 'cpf',
    blockList: false
  },
  searchByCpfBlockList: {
    docNumber: '',
    type: 'cpf',
    blockList: true
  },
  searchByCnpj: {
    docNumber: '',
    type: 'cnpj',
    blockList: false
  },
  searchByCnpjBlockList: {
    docNumber: '',
    type: 'cnpj',
    blockList: true
  },
  searchByAllDocsBlockList: {
    docNumber: '',
    type: 'all',
    blockList: true
  },
  docNumberToBeRemoved: {
    docNumber: '15974249003'
  },
  docNumberToBeRemovedThatNotExists: {
    docNumber: '15974249000'
  },
  docNumberToBeStatusChange: {
    docNumber: '15974249003'
  },
  docNumberInvalidToBeStatusChange: {
    docNumber: '15974249000'
  },
  docNumberExistsDB: {
    docNumber: '15974249003'
  },
  docNumberNOTExistsDB: {
    docNumber: '11174249000'
  }
}
