const Discord = require('discord.js')
const client = new Discord.Client();

const TOKEN = "NjU5NjE3MzA3MTAxNzU3NDQw.XgQ7Dw.4HFb2XiQpr42w20VXtYh2VwR-tQ";

const PREFIX = "!";

const file_system = require('fs');
const image_dir = './images/';

client.login(TOKEN)

client.on("ready", () => {
    console.log("This bot is online");
})

client.on("message", message => {
    if(message.content.includes("loli")) {
        message.reply("Ahh a fewwow cutie I see UwU~~");
    } else {
        let args = message.content.substring(PREFIX.length).split(" ");

        switch(args[0]) {
            case "degen":
                file_system.readdir(image_dir, (err, files) => {
                    numberOfImages = files.length;
                    message.reply("OwO IF YOU SAY SO~~~");
                    randomImage = Math.floor (Math.random() * numberOfImages) + 1;
                    message.channel.send ({files: [image_dir + randomImage + ".png"]})
                  });
                break;
    
            default:
                break;
        }
    }
})
