const Discord = require('discord.js')
const client = new Discord.Client();

const token = "NjU5NjE3MzA3MTAxNzU3NDQw.XgQ7Dw.4HFb2XiQpr42w20VXtYh2VwR-tQ";

client.login(token)

client.on("ready", () => {
    console.log("This bot is online");
})

client.on("message", message => {
    if(message.content === "HELLO") {
        message.reply("SUP DEGEN");
    }
})
