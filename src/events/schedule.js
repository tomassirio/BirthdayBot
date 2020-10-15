var cron = require('node-cron');

module.exports = async (client) => {
    await client.mongoose.init()
    cron.schedule('0 09 * * *', () => {
        console.log('Runing a job at 09:00 at America/Sao_Paulo timezone');
      }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
      });
}
