const Member = require('../models/Member')
const Server = require('../models/Server')

const MemberRepository = {
    find: async (memberId, serverId) => {
        try {
            return await Model.findOne({server: serverId, members: { $elemMatch: { user: memberId } } })
        } catch (e) {
            console.log(e)
            return null
        }
    },

    create: async (memberData, serverData) => {
        const server = await Server.findOne({serverId: serverData.id})
        const member = new Member({
            birthday: memberData.birthday,
            user: memberData.name,
        })

        server.members.push(member)

        try {
            server.save()
            console.log('Stored', server)
        } catch (e) {
            console.error(e)
        }

        return member
    },

    findOrCreate: async (memberData, serverData) => {
        const member = await MemberRepository.find(memberData.id, serverData.id)

        if (member) {
            return member
        }

        return MemberRepository.create(memberData, serverData)
    },
}

module.exports = MemberRepository
