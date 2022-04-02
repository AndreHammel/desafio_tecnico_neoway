const model = require('./../models')

module.exports = {

  register: async (data) => {
    return await model.register(data)
  },

  search: async (data) => {
    if (data.docNumber) {
      const result = await model.searchByNumber({ docNumber: data.docNumber })
      if (!result) return []
      return [ result ]
    }
    if (data.type === 'all') {
      const result = await data.blockList
        ? await model.searchGetAll({ blockList: true })
        : await model.searchGetAll({})
      return result
    }
    const result = await data.blockList
      ? await model.searchGetAll({ type: data.type, blockList: true })
      : await model.searchGetAll({ type: data.type })
    return result
  },

  changeBlockListStatus: async (data) => {
    const docExists = await model.searchByNumber({ docNumber: data.docNumber })
    if (!docExists) return { modifiedCount: 0 }
    return model.changeBlockListStatus(data.docNumber, docExists.blockList)
  },

  remove: async (data) => {
    return await model.remove(data.docNumber)
  }
}
