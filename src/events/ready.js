module.exports = async (client) => {
    await client.mongoose.init()

    console.log(`Logged in as ${client.user.tag}!`)
}
