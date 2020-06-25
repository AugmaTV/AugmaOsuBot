const Discord = require("discord.js")
const osu = require("node-osu")
const osuApi = new osu.Api(require("../api_key.json").osu)

function getPp(pp) {
    if(pp === null) return 0;
    return pp;
}

module.exports.run = async(client, message, args) => {
    if(args.length == 1) {
        var user = args[0]
        osuApi.getUserRecent({ u : user}).then(scores => {
            var embed = new Discord.MessageEmbed()
            .setTitle("player " + user)
            .setURL("https://osu.ppy.sh/users/" + scores[0].user.id)
            .setDescription("max combo : " + scores[0].maxCombo + "\npp : " + getPp(scores[0].pp))
            message.channel.send(embed)
        }).catch(error => message.reply(error))
    } else if(args.length == 0) {
        message.reply(" renseigne le pseudo du joueur stp §rc <username>")
    }
    /*const embed = new Discord.MessageEmbed()
    .addFields(
        {name: `__osu__`, value: `${client.commands.filter(cmd => cmd.help.category === "osu").map(cmd => `\`${cmd.help.name}\``).join(" ")}`, inline: true})
    .setFooter(`Made By ${client.owner}`)
    .setColor("PURPLE")
    .setThumbnail(client.user.avatarURL())

    message.channel.send(embed)*/
}

module.exports.help = {
    name: "recent",
    cooldown: 3,
    aliases: ['rc'],
    category: "osu"
}