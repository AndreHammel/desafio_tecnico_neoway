const model = require('./../models');

module.exports = {
  register: async (data) => {
    return await model.register(data)
  },
  search: async (data) => {
    if (data.docNumber) {
      const result = await model.searchByNumber(data.docNumber)
      if (!result) return []
      return result
    }
    if (data.type === 'all') {
      return await model.searchGetAll(data.sort)
    }
    return await model.searchByType(data.type, data.sort)
  },
  changeBlockListStatus: async (data) => {
    await model.changeBlockListStatus(data.docNumber)
  },
  remove: async (data) => {
    await model.remove(data.docNumber)
  }
}