const mongoose = require('mongoose')

const serverSchema = mongoose.Schema({
    serverId: {
        default: '1',
        type: String,
    },
    name: {
        default: 'emptyServer',
        type: String,
    },
    members: [],
})

module.exports = mongoose.model('Server', serverSchema, 'servers')
