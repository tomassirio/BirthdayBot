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
            // Dates will all come back with the same character count so slicing up to the end of the year seems simplest
            const formattedDate = member.birthday.toString().slice(0,15);
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            
            embededMessage = Util.embedMessage(
                'Your Birthday',
                message.author.tag,
                `0x${randomColor}`,
                `Your Birthday is set to ${formattedDate}.`                
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
