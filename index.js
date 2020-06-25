const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const token = require("./api_key.json").discord

client.login(token).then(() => {
    console.log("Bot Logged On, Ready To Work")
    client.user.setActivity("§help", {type: "PLAYING"})
})

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.disabled = new Set()
client.owner = "AugmaDev#4544"

fs.readdir('./commands/', (error, f) => {
    if (error) {return console.error(error)}
        let commandes = f.filter(f => f.split('.').pop() === 'js')
        if (commandes.length <= 0) {return console.log('Aucune commande DEV trouvée !')}

        commandes.forEach((f) => {
            let commande = require(`./commands/${f}`)
            console.log(`ALL | ${f} commande chargée !`)
            client.commands.set(commande.help.name, commande)
            commande.help.aliases.forEach(alias => {
                client.aliases.set(alias, commande.help.name)
            })
        })
})

fs.readdir('./events/', (error, f) => {
    if (error) {return console.error(error)}
    let event = f.filter(f => f.split('.').pop() === 'js')
    if (event.length <= 0) {return console.log('Aucun event trouvée !')}else{
        console.log(`${f.length} events chargés`)}

        f.forEach((f) => {
            let events = require(`./events/${f}`)
            let event = f.split('.')[0]
            client.on(event, events.bind(null, client))
        })
})