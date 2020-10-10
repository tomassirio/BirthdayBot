const { Schema, model } = require('mongoose')

const memberSchema = Schema({
    birthday: {
        default: '',
        type: String,
    },
    user: {
        default: '',
        type: String,
    },
})

module.exports = model('Member', memberSchema, 'memberTest')
