const { Schema, model } = require('mongoose')

const memberSchema = Schema({
    birthday: {
        default: '',
        type: Date,
    },
    user: {
        default: '',
        type: String,
    },
})

module.exports = model('Member', memberSchema, 'memberTest')
