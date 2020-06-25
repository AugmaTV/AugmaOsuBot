const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addFields(
        {name: `__about__`, value: `${client.commands.filter(cmd => cmd.help.category === "about").map(cmd => `\`${cmd.help.name}\``).join(" ")}`, inline: true},
        {name: `__support__`, value: `${client.commands.filter(cmd => cmd.help.category === "support").map(cmd => `\`${cmd.help.name}\``).join(" ")}`, inline: true},
        {name: `__command__`, value: `${client.commands.filter(cmd => cmd.help.category === "command").map(cmd => `\`${cmd.help.name}\``).join(" ")}`}
        )
    .setFooter(`Made By ${client.owner}`)
    .setColor(client.color.about)
    .setThumbnail(client.user.avatarURL())

    message.channel.send(embed)
}

module.exports.help = {
    name: "recent",
    cooldown: 5,
    aliases: ['rc'],
    category: "osu"
}