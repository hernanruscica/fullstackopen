require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const PORT = process.env.PORT || 3000

module.exports = { MONGODB_URI, MONGODB_USER, MONGODB_PASS, PORT }