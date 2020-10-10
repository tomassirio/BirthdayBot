const Util = require('../utils/utils.js')
const Item = require('../models/Member.js')
const ChannelRepository = require('../repositories/server-repository')

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

        // const newItem = new Item({
        //     content: item,
        //     author: message.author.tag,
        // })

        // const dbChannel = await ChannelRepository.findOrCreate(channel)
        // dbChannel.items.push(newItem)
        // dbChannel.save()

        let embededMessage = Util.embedMessage(
            "Your birthday was set to " + date,
            message.author.tag,
            '0xffff00',
            item
        )
        channel.send(embededMessage)
    },
}
