const Util = require("../utils/utils.js");
const Member = require("../models/Member.js");
const ServerRepository = require("../repositories/server-repository");
const Server = require("../models/Server.js");

module.exports = {
  name: "birthday",
  description: "Adds/Edits the user`s birthday",
  execute: async (message, args) => {
    let item = "";
    for (let i = 0; i < args.length; i++) {
      item += args[i] + " ";
    }
    let channel = message.channel;

        if (args === undefined || args.length != 3) {
            var embeded = Util.embedMessage("Error",
            message.author.tag,"0x232529", "Birthday's format is dd mm yyyy")
            channel.send(embeded);
            return
        }
        let dateString = args[1] + " " + args[0] + " " + args[2]
        let date = new Date(dateString)
        const dbServer = await ServerRepository.findOrCreate(message.guild)
        
        let member = dbServer.members.find(m => m.user === message.author.tag)
        console.log(member)
        if(member){
            let memberIndex = dbServer.members.findIndex(m => m.user === message.author.tag)
            dbServer.members[memberIndex].birthday = date       
            dbServer.markModified('members')     
            await dbServer.save()
           
        }else{
            const newBirthday = new Member({
                user: message.author.tag,
                birthday: date
            })
            dbServer.members.push(newBirthday)
            await dbServer.save()
        }

        let embededMessage = Util.embedMessage(
            'Birthday Set',
            message.author.tag,
            '0xffff00',
            "Your birthday was set to " + date
        )
        channel.send(embededMessage)
        
    },
}
