// eslint-disable-next-line import/no-unresolved
const Discord = require('discord.js')

const Utils = {
    embedMessage(message, author, color, item) {
        const embed = new Discord.MessageEmbed()
            .setTitle(message)
            .setColor(color)
            .setDescription(item)
            .setFooter(author)
            .setTimestamp()
        return embed
    },
}

module.exports = Utils
