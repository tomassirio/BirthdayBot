var cron = require('node-cron');
const ServerRepository = require("../repositories/server-repository.js");

module.exports = async (client) => {
    await client.mongoose.init()
    cron.schedule('0 9 * * *', () => {
      // get the current date so we can compare dates later when verifying birthdays
      const date = new Date();
      const currentMonth = date.getMonth() + 1;
      const currentDay = date.getDate();

      // get the servers
      client.guilds.cache.forEach(async (guild) => {
        const dbServer = await ServerRepository.findOrCreate(guild);    
        let flag = false;
        let birthdayChannel = null;
        guild.channels.cache.forEach(channel => {
          if(channel.name == 'birthdaybot') {
            flag = true;
            birthdayChannel = channel
          }
        })
        // create the birthdayBot channel if the server doesnt have it
        if(!flag) {
          birthdayChannel = await guild.channels.create("birthdaybot", "text/voice");
        }

        // wish each member in the db a happy birthday
        dbServer.members.forEach(member => {
          const month = member.birthday.getUTCMonth()+1;
          const day = member.birthday.getUTCDate();
          if (month === currentMonth && day === currentDay) {
            birthdayChannel.send(`Today is <@${member.discord_id}>'s birthday! Happy birthday!!`)
          }
        })

      })
      }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
      });
}
