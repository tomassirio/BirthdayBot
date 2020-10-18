const Util = require("../utils/utils.js");
const ServerRepository = require("../repositories/server-repository");
const moment = require("moment");

module.exports = {
  name: "birthdays",
  description: "Lists all users birthdays",
  execute: async (message, args) => {
    let channel = message.channel;

    const dbServer = await ServerRepository.findOrCreate(message.guild);

    let birthdays = dbServer.members
      .filter((member) => member.birthday != undefined)
      .sort((a, b) => yearless(a.birthday) - yearless(b.birthday))
      .reduce(formatUsers, "");

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

    let embededMessage = Util.embedMessage(
      `List of All Registered Birthdays`,
      message.author.tag,
      "0xffff00",
      birthdays
    );

    channel.send(embededMessage);
  },
};

const formatUsers = (accumulator, member) => {
  const date = moment(member.birthday).format("MMM Do");
  return accumulator + `${date} => ${member.user}\n`;
};

const yearless = (aDate) => new Date(1900, aDate.getMonth(), aDate.getDay());