const Server = require('../models/Server')

const ServerRepository = {
    find: async (id) => {
        try {
            return await Server.findOne({
                serverId: id,
            })
        } catch (e) {
            console.log(e)
            return null
        }
    },

    create: async (serverData) => {
        const server = new Server({
            serverId: serverData.id,
            name: serverData.name,
            members: [],
        })

        try {
            server.save()
            console.log('Stored', server)
        } catch (e) {
            console.error(e)
        }

        return server
    },

    findOrCreate: async (serverData) => {
        const server = await ServerRepository.find(serverData.id)

        if (server) {
            return server
        }

        return ServerRepository.create(serverData)
    },
}

module.exports = ServerRepository
