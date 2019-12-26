const Discord = require('discord.js')
const client = new Discord.Client();

const TOKEN = "NjU5NjE3MzA3MTAxNzU3NDQw.XgQ7Dw.4HFb2XiQpr42w20VXtYh2VwR-tQ";

const PREFIX = "!";

const file_system = require('fs');
const image_dir = './images/';

// must manually be set to number of pasta types available (furry + weeb = 2)
const NUMBER_OF_PASTAS = 2;

client.login(TOKEN);

client.on("ready", () => {
    console.log("DegenerateBot online");
});

function getPasta(type) {
    var jsonString = file_system.readFileSync("copypastas.json", "utf8");
    var obj = JSON.parse(jsonString);
    switch (type) {
        case "furry":
            var random_array_value = Math.floor(Math.random() * obj.furry_pastas.length);
            return obj.furry_pastas[random_array_value].pasta;
        case "weeb":
            var random_array_value = Math.floor(Math.random() * obj.weeb_pastas.length);
            return obj.weeb_pastas[random_array_value].pasta;
        default:
            break;
    }
}

client.on("message", message => {
    if (message.content.substring(0, 1) === "!") {

        let command = message.content.substring(PREFIX.length).split(" ");
        switch (command[0].toLowerCase()) {
            case "degen":
                file_system.readdir(image_dir, (err, files) => {
                    var numberOfImages = files.length;
                    message.reply("OwO IF YOU SAY SO~~~");
                    var randomImage = Math.floor(Math.random() * numberOfImages) + 1;
                    message.channel.send({ files: [image_dir + randomImage + ".jpg"] });
                });
                break;
            case "furry":
                var pasta = getPasta("furry");
                message.channel.send(pasta);
                break;
            case "weeb":
                var pasta = getPasta("weeb");
                message.channel.send(pasta);
                break;
            case "stop":
                message.reply("UMU nice try~~ >w<");
                break;
            default:
                message.reply("ohh nyoo I did a fuccy wukky hehe~ ;;w;;\n wat command is dat (´・ω・\`)");
                break;
        }
    } else if (message.member.user.tag != "DegenerateBot#4865" &&
        message.content.substring(0, 1) === "+") {

        let command = message.content.substring(PREFIX.length).split(" ");
        switch (command[0].toLowerCase()) {
            case "play":
                var chanceToPlay = Math.random();
                if (chanceToPlay >= 0 && chanceToPlay <= .1) {
                    setTimeout(function () {
                        console.log("someone said +play...");
                        var voiceChannel = message.member.voiceChannel;
                        voiceChannel.join();
                        setTimeout(function () {
                            // play music
                        }, 3000);
                    }, 5000);
                }
                break;
            default:
                break;
        }
    } else if (message.member.user.tag != "DegenerateBot#4865" &&
        message.content.toLowerCase().includes("loli")) {
        message.reply("Ahh a fewwow cutie I see UwU~~");
    } else if (message.member.user.tag != "DegenerateBot#4865" &&
        message.content.toLowerCase() === "stop") {
        message.reply("hee-hee~~ we will nevwa stawp being weebuwus!!!~");
    } else {
        var chance_for_random_message = Math.random();

        if (message.member.user.tag != "DegenerateBot#4865"
            && message.member.user.tag != "Vexera#8487"
            && chance_for_random_message >= 0
            && chance_for_random_message <= .25) {

            var smileys = [";;w;;", "^w^", ">w<", "UwU", "(・`ω\´・)", "(´・ω・\`)"];
            var random_smiley = smileys[Math.floor(Math.random() * smileys.length)];

            var regex = /[lr]/g;
            var owo_msg = message.content.replace(regex, "w");

            owo_msg += " " + random_smiley;
            message.reply(owo_msg);
        } else if (message.member.user.tag != "DegenerateBot#4865"
            && message.member.user.tag != "Vexera#8487"
            && chance_for_random_message > .25
            && chance_for_random_message <= .35) {

            message.reply("WOW~ YOU GOT A RARE DROP UWU!");
            var randomPastaType = Math.floor(Math.random() * (NUMBER_OF_PASTAS + 1));
            switch (randomPastaType) {
                case 0:
                    var pasta = getPasta("furry");
                    message.channel.send(pasta);
                    break;
                case 1:
                    var pasta = getPasta("weeb");
                    message.channel.send(pasta);
                    break;
                case 2:
                    file_system.readdir(image_dir, (err, files) => {
                        var numberOfImages = files.length;
                        var randomImage = Math.floor(Math.random() * numberOfImages) + 1;
                        message.channel.send({ files: [image_dir + randomImage + ".jpg"] });
                    });
                    break;
                default:
                    break;
            }
        }
    }
});
