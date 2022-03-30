const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()
const URL = process.env.HOSTNAME

let connection = null;

module.exports = async () => {
  try {
    return connection ?
      connection :
      connection = (await MongoClient.connect(
        URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )).db(process.env.DATABASE);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}