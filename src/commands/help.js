const Util = require('../utils/utils.js')

module.exports = {
    name: 'help',
    description: 'Provides help about the commands',
    execute: async (message) => {
        const { channel } = message
        const color = '0xffff00'

        let embededMessage;
        embededMessage = Util.embedMessage(
            'Help',
            message.author.tag,
            color,
            process.env.PREFIX + 'birthday <dd mm yyyy>: adds your birthday to the server\n\n' +
            process.env.PREFIX + 'birthdays: brings all the birthdays in the server\n\n' +
            process.env.PREFIX + 'nextBirthday: gets the next server\'s birthday\n\n' +
            process.env.PREFIX + 'whatsMyBirthday: gets your birthday\n\n'+
            process.env.PREFIX + 'help: shows all commands and their description\n'
        );
        channel.send(embededMessage)
    },
}