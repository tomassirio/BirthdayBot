/* eslint-disable import/no-unresolved */
const path = require('path')
const result = require('dotenv').config({ path: path.join(__dirname, '.env') })

if (result.error) throw result.error // Throw an error if it failed to load the content off the .env file.

module.exports = {
    prefix: process.env.PREFIX,
    botToken: process.env.BOT_TOKEN,
    devMongoUrl: "mongodb+srv://".concat(process.env.LOCAL_DB_USER, ":").concat(process.env.LOCAL_DB_PASS,"@cluster0.mhoa7.mongodb.net/").concat(process.env.LOCAL_DB_MONGO, "?retryWrites=true&w=majority"),
    productionMongoURL: "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@cluster0.mhoa7.mongodb.net/").concat(process.env.DB_MONGO, "?retryWrites=true&w=majority"),
}
