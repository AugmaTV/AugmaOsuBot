const Discord = require("discord.js")
let cooldown = new Map()
const prefix = require("../config.json").prefix

module.exports = (client, message) => {
    if(message.content.startsWith(prefix)) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g)
        let commande = args.shift().toLowerCase()
        let cmd = client.commands.get(commande) || client.commands.get(client.aliases.get(commande))
        if(cooldown.has(message.author.id)) {
            if(cooldown.get(message.author.id).has(cmd.help.name)) {
                message.delete()
                let remaining = cdseconds - ((Date.now() - cooldown.get(message.author.id).get(cmd.help.name)) / 1000)
                message.reply(`Tu as ${Number.parseFloat(remaining).toFixed(2)} secondes de cooldown avant de réutiliser cette commande.`)
                return
            }
        }
        if(client.disabled.has(cmd.help.name)) {
            message.reply(" this command is disabled.")
            return
        }
        if(message.author.bot || message.channel.type === 'dm') {return}
        if(!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {return}
        

        if(cmd) {
            cmd.run(client, message, args)
            cdseconds = cmd.help.cooldown
            let map = new Map()
            map.set(cmd.help.name, Date.now())
            cooldown.set(message.author.id, map)
            
            setTimeout(() => {
                cooldown.delete(message.author.id, map)
            }, cdseconds * 1000)
        }
    }
}