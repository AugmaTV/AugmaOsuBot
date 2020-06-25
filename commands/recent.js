const Discord = require("discord.js")
const osu = require("node-osu")
const osuApi = new osu.Api(require("../api_key.json").osu, {
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
})

function getPp(pp) {
    if(pp === null) return 0
    return pp
}

module.exports.run = async(client, message, args) => {
    if(args.length == 1) {
        var user = args[0]
        osuApi.getUserRecent({ u : user}).then(scores => {
            console.log(scores[0])
            var embed = new Discord.MessageEmbed()
            .setAuthor(user, "http://s.ppy.sh/a/" + scores[0].user.id, "https://osu.ppy.sh/users/" + scores[0].user.id)
            .setTitle(scores[0]._beatmap)
            .setURL("https://osu.ppy.sh/users/" + scores[0].user.id)
            .setColor("PURPLE")
            .setDescription("max combo : " + scores[0].maxCombo + "\npp : " + getPp(scores[0].pp))
            message.channel.send(embed)
        })
    } else if(args.length == 0) {
        message.reply(" renseigne le pseudo du joueur stp §rc <username>")
    }
}

module.exports.help = {
    name: "recent",
    cooldown: 3,
    aliases: ['rc'],
    category: "osu"
}