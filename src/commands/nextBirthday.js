const Util = require('../utils/utils.js')
const ServerRepository = require('../repositories/server-repository')
const moment = require("moment");

module.exports = {
    name: 'nextbirthday',
    description: 'Add an element to the list',
    execute: async (message, args) => {
        let channel = message.channel;

        const dbServer = await ServerRepository.findOrCreate(message.guild);

        let birthdays = dbServer.members
            .filter((member) => member.birthday != undefined)
            .sort((a, b) => formatDate(a.birthday) - formatDate(b.birthday))
        
        let offsets = [...birthdays]

        if (!birthdays) {
            let embededMessage = Util.embedMessage(
                `No Birthdays Found`,
                message.author.tag,
                "0xffff00",
                `Users in this server have not set their Birthdays yet!`
            );

            channel.send(embededMessage);
            return;
        }
        
        let birthdayEntry = find(offsets)
        let birthday = formatUser(birthdays[birthdayEntry])
        let embededMessage = Util.embedMessage(
            `Next Birthday`,
            message.author.tag,
            "0xffff00",
            birthday
        );

        channel.send(embededMessage);

    },
};

const formatUser = (member) => {
    const date = moment(member.birthday).format("MMM Do");
    return `${date} => ${member.user}\n`;
};


const formatDate = (member) => {
    const date = moment(member.birthday).format("MM DD");
    return date
};

let find = (birthdays) => {
    let currentTime = new Date();
    
    let low = 0, high = birthdays.length-1
    let res = 0
    while(low<high){
        let mid = Math.floor((low + high)/2) 
        if(birthdays[mid].birthday>currentTime){
            res = mid
            high = mid - 1
        }else{
            low = mid + 1
        }
    }
    return res

}
