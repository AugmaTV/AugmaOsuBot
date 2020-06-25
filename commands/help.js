const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addFields(
        {name: `__about__`, value: `${client.commands.filter(cmd => cmd.help.category === "about").map(cmd => `\`${cmd.help.name}\``).join(" ")}`, inline: true},
        {name: `__osu__`, value: `${client.commands.filter(cmd => cmd.help.category === "osu").map(cmd => `\`${cmd.help.name}\``).join(" ")}`, inline: true}
        )
    .setFooter(`Made By ${client.owner}`)
    .setColor("PURPLE")
    .setThumbnail(client.user.avatarURL())

    message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    cooldown: 3,
    aliases: ['h'],
    category: "about"
}