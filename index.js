const Discord = require('discord.js')
const client = new Discord.Client();

const TOKEN = "NjU5NjE3MzA3MTAxNzU3NDQw.XgQ7Dw.4HFb2XiQpr42w20VXtYh2VwR-tQ";

const PREFIX = "!";

const file_system = require('fs');
const image_dir = './images/';

client.login(TOKEN);

client.on("ready", () => {
    console.log("This bot is online");
})

client.on("message", message => {

    if (message.content.includes("loli")) {
        message.reply("Ahh a fewwow cutie I see UwU~~");
    } else if (message.content.substring(0, 1) === "!") {
        let command = message.content.substring(PREFIX.length).split(" ");

        switch (command[0]) {
            case "degen":
                file_system.readdir(image_dir, (err, files) => {
                    numberOfImages = files.length;
                    message.reply("OwO IF YOU SAY SO~~~");
                    randomImage = Math.floor(Math.random() * numberOfImages) + 1;
                    message.channel.send({ files: [image_dir + randomImage + ".png"] });
                });
                break;
            case "furry":
                let jsonString = file_system.readFileSync("copypastas.json", "utf8");
                let obj = JSON.parse(jsonString);

                random_array_value = Math.floor(Math.random() * obj.furry_pastas.length);
                message.channel.send(obj.furry_pastas[random_array_value].pasta);
                break;
            default:
                break;
        }
    } else {
        chance_for_random_message = Math.random();

        if (message.member.user.tag != "DegenerateBot#4865"
            && chance_for_random_message >= 0 
            && chance_for_random_message <= .25) {

            smileys = [";;w;;", "^w^", ">w<", "UwU", "(・`ω\´・)", "(´・ω・\`)"];
            random_smiley = smileys[Math.floor(Math.random() * smileys.length)];

            let regex = /[lr]/g;
            let owo_msg = message.content.replace(regex, "w");

            owo_msg += " " + random_smiley;
            message.reply(owo_msg);
        }
    }
})
