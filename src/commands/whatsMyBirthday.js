const Util = require('../utils/utils.js')
const Item = require('../models/Member.js')
const ServerRepository = require('../repositories/server-repository')
const { db } = require('../models/Member.js')
const Server = require('../models/Server.js')
const MemberRepository = require('../repositories/member-repository.js')
const {prefix} = require('../config')

module.exports = {
    name: 'whatsmybirthday',
    description: 'Shows you your birthday',
    execute: async (message, _) => {

        let channel = message.channel

        
        const dbServer = await ServerRepository.findOrCreate(message.guild)
        
        let member = dbServer.members.find(m => m.user === message.author.tag)
        let embededMessage;
        if(member){
            embededMessage = Util.embedMessage(
                'Your Birthday',
                message.author.tag,
                '0xffff00',
                `Your Birthday is set to ${member.birthday}.`                
            )
        }else{
            embededMessage = Util.embedMessage(
                'Birthday not Set',
                message.author.tag,
                '0xffff00',
                `You have not set your Birthday! Please set your Birthday using the {${prefix}birthday dd mm yy} command.`
                
            )
        }

        channel.send(embededMessage)
        return
    },
}
