const Util = require("../utils/utils.js");
const ServerRepository = require("../repositories/server-repository");
const moment = require("moment");

module.exports = {
  name: "birthdays",
  description: "Lists all users birthdays",
  execute: async (message, args) => {
    let channel = message.channel;

    if (args.length !== 0) {
      var embeded = Util.embedMessage(
        "Error",
        "0x232529",
        "Birthdays has no arguments"
      );
      channel.send(embeded);
      return;
    }

    const dbServer = await ServerRepository.findOrCreate(message.guild);

    let birthdays = dbServer.members
      .filter((member) => member.birthday != undefined)
      .sort((a, b) => yearless(b.birthday) - yearless(a.birthday))
      .reduce(formatUsers, "");

    let embededMessage = Util.embedMessage(
      `here's the list of the registered birthdays:`,
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
