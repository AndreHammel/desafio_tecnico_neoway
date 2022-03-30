const connection = require('./connection')

const order = {
  type: -1,
  blockList: -1,
  docNumber: 1
}

module.exports = {
  register: async (data) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .insertOne(data)
  },
  searchByNumber: async (docNumber) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .findOne({ docNumber })
  },
  searchGetAll: async (sort) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .find().sort({ [ sort ]: order[ sort ] }).toArray()
  },
  searchByType: async (type, sort) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .find({ type }).sort({ [ sort ]: order[ sort ] }).toArray()
  },
  changeBlockListStatus: async (docNumber) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .updateOne(
        { docNumber },
        [
          { $set: { blockList: { $not: "$blockList" } } }
        ])
  },
  remove: async (docNumber) => {
    return (await connection())
      .collection(process.env.COLLECTION)
      .deleteOne({ docNumber })
  },
}