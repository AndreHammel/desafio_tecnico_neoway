const connection = require('./connection')

module.exports = {
  register: async (data) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .insertOne(data)
  },

  searchByNumber: async (docNumberToFind) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .findOne(docNumberToFind)
  },

  searchGetAll: async (keyAndValuesTofilter) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .find(keyAndValuesTofilter).toArray()
  },

  changeBlockListStatus: async (docNumber, boolean) => {
    const result = await (await connection())
      .collection(process.env.COLLECTION)
      .updateOne(
        { docNumber },
        { $set: { blockList: !boolean } }
      )
    return result
  },

  remove: async (docNumber) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .deleteOne({ docNumber })
  }
}
