const Util = require('../utils/utils.js')
const Member = require('../models/Member.js')
const ServerRepository = require('../repositories/server-repository')
const { db } = require('../models/Member.js')
const Server = require('../models/Server.js')
const MemberRepository = require('../repositories/member-repository.js')

module.exports = {
    name: 'birthday',
    description: 'Adds/Edits the user`s birthday',
    execute: async (message, args) => {
        let item = ''
        for (let i = 0; i < args.length; i++) {
            item += args[i] + ' '
        }
        let channel = message.channel

        if (args === undefined || args.length != 3) {
            var embeded = Util.embedMessage("Error", "0x232529", "Birthday's format is dd mm yyyy")
            channel.send(embeded);
            return
        }
        let dateString = args[1] + " " + args[0] + " " + args[2]
        let date = new Date(dateString)

        const dbServer = await ServerRepository.findOrCreate(message.guild)

        const newBirthday = new Member({
            user: message.author.tag,
            birthday: date
        })
        let member = dbServer.members.find(m => m.user === message.author.tag)

        if(member){
            dbServer.members.pull(member)      
        }

        dbServer.members.push(newBirthday)

        let embededMessage = Util.embedMessage(
            "Your birthday was set to " + date,
            message.author.tag,
            '0xffff00',
            item
        )
        channel.send(embededMessage)
    },
}
