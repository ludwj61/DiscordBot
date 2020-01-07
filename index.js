const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "!";

const file_system = require("fs");
const image_dir = "./images/";

const ytdl = require("ytdl-core");

const TOKEN = JSON.parse(file_system.readFileSync("config.json", "utf8"));

const FUR_PASTA_FILE = "furrypastas.json";
const WEEB_PASTA_FILE = "weebpastas.json";
const HEWWO_PASTA_FILE = "hewwopastas.json";

// must manually be set to number of pasta types available that you want in general pool
// (not !hewwo command pool)
const NUMBER_OF_PASTAS = 2;

const MIN_INTERVAL = 100000 * 60;

const activities_list = [
  "playing with lolis.",
  "embracing my fursona.",
  "!info for help.",
  "looking cute."
]; // creates an arraylist containing phrases you want your bot to switch through.

client.login(TOKEN.token);

function setActivity() {
  const index = Math.floor(Math.random() * (activities_list.length - 1));
  client.user.setActivity(activities_list[index]);
}

client.on("ready", () => {
  console.log("DegenerateBot online");
  setActivity();
  setInterval(() => {
    setActivity();
  }, 1000000);
});

function getPasta(type) {
  var jsonString;
  var obj;
  switch (type) {
    case "furry":
      jsonString = file_system.readFileSync(FUR_PASTA_FILE, "utf8");
      obj = JSON.parse(jsonString);
      var random_array_value = Math.floor(Math.random() * obj.pastas.length);
      return obj.pastas[random_array_value].pasta;
    case "weeb":
      jsonString = file_system.readFileSync(WEEB_PASTA_FILE, "utf8");
      obj = JSON.parse(jsonString);
      var random_array_value = Math.floor(Math.random() * obj.pastas.length);
      return obj.pastas[random_array_value].pasta;
    case "hewwo":
      jsonString = file_system.readFileSync(HEWWO_PASTA_FILE, "utf8");
      obj = JSON.parse(jsonString);
      var random_array_value = Math.floor(Math.random() * obj.pastas.length);
      return obj.pastas[random_array_value].pasta;
    default:
      break;
  }
}

function playYoutubeVideo(link, voiceChannel) {
  const streamOptions = { seek: 0, volume: 1 };
  voiceChannel
    .join()
    .then(connection => {
      const stream = ytdl(link, { filter: "audioonly" });
      const dispatcher = connection.playStream(stream, streamOptions);
      dispatcher.on("end", end => {
        voiceChannel.leave();
      });
    })
    .catch(err => console.log(err));
}

function showRandomImage(message) {
  file_system.readdir(image_dir, (err, files) => {
    var numberOfImages = files.length;
    var randomImage = Math.floor(Math.random() * numberOfImages) + 1;
    message.channel.send({ files: [image_dir + randomImage + ".jpg"] });
  });
}

function getFileSizeInMegaBytes(filename) {
  var stats = file_system.statSync(filename);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes / 1000000.0;
}

function removeCommandFromString(commandString) {
  if (commandString.includes("!addfurry")) {
    commandString = commandString.split("!addfurry").join();
  } else if (commandString.includes("!addweeb")) {
    commandString = commandString.split("!addweeb").join();
  } else if (commandString.includes("!addhewwo")) {
    commandString = commandString.split("!addhewwo").join();
  }
  return commandString.substring(2);
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

function addPasta(pastaType, message) {
  var type = "";
  var data = removeCommandFromString(message.content).trim();
  if (data.length <= 200) {
    message.reply("pwese type a weal pasta >.<");
  } else {
    switch (pastaType) {
      case FUR_PASTA_FILE:
        type = "furry";
        break;
      case WEEB_PASTA_FILE:
        type = "weeb";
        break;
      case HEWWO_PASTA_FILE:
        type = "hewwo";
        break;
      default:
        break;
    }
    if (getFileSizeInMegaBytes(pastaType) >= 100) {
      message.reply("I have way too many " + type + " pastas!");
    } else {
      jsonString = file_system.readFileSync(pastaType, "utf8");
      if (jsonString.trim().includes(JSON.stringify(data))) {
        message.reply("I've got that one alweady ;;.;;");
      } else {
        obj = JSON.parse(jsonString);
        obj.pastas.push({ pasta: data });
        jsonContent = JSON.stringify(obj);

        file_system.writeFile(pastaType, jsonContent, "utf8", function(err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log("JSON file has been saved.");
          message.reply("Yay i added dat wun ^^");
        });
      }
    }
  }
}

function uwuify(message) {
  var smileys = [";;w;;", "^w^", ">w<", "UwU", "(・`ω´・)", "(´・ω・`)"];
  var random_smiley = smileys[Math.floor(Math.random() * smileys.length)];

  var regex = /[lr]/g;
  var owo_msg = message.content.replace(regex, "w");
  owo_msg += " " + random_smiley;

  message.channel.send("hehe~\n");

  if (owo_msg.includes("!uwuify")) {
    owo_msg = owo_msg.split("!uwuify").join();
    message.channel.send(owo_msg.substring(1));
  } else {
    message.reply(owo_msg);
  }
}

client.on("message", message => {
  if (message.content.substring(0, 1) === "!") {
    let command = message.content.substring(PREFIX.length).split(" ");
    switch (command[0].toLowerCase()) {
      case "degen":
        showRandomImage(message);
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
      case "pleasenomore":
        voiceChannel = message.member.voiceChannel.leave();
        message.reply("meanie... >w<");
        break;
      case "hewwo":
        var pasta = getPasta("hewwo");
        message.channel.send(pasta);
        break;
      case "loop":
        setInterval(function() {
          message.channel.send("nyaaaaaaaaaa~");
        }, MIN_INTERVAL);
        break;
      case "info":
        const embed = new Discord.RichEmbed()
          .addField(
            "What is this horrible creation?",
            "The DegenerateBot will keep your server at peak degeneracy at all times."
          )
          .addField(
            "Some commands",
            "!furry\n!weeb\n!degen\n!hewwo\n!uwuify\n!addfurry\n!addweeb\n!addhewwo"
          );
        message.channel.send(embed);
        break;
      case "uwuify":
        uwuify(message);
        break;
      case "addfurry":
        addPasta(FUR_PASTA_FILE, message);
        break;
      case "addweeb":
        addPasta(WEEB_PASTA_FILE, message);
        break;
      case "addhewwo":
        addPasta(HEWWO_PASTA_FILE, message);
        break;
      default:
        message.reply(
          "ohh nyoo I did a fuccy wukky hehe~ ;;w;;\n wat command is dat (´・ω・`)"
        );
        break;
    }
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.substring(0, 1) === "+"
  ) {
    let command = message.content.substring(PREFIX.length).split(" ");
    switch (command[0].toLowerCase()) {
      case "play":
        var chanceToPlay = Math.random();
        if (chanceToPlay >= 0 && chanceToPlay <= 0.25) {
          setTimeout(function() {
            var voiceChannel = message.member.voiceChannel;
            var link = "https://www.youtube.com/watch?v=SGF_iTLdw4U";
            playYoutubeVideo(link, voiceChannel);
          }, 3000);
        }
        break;
      case "skip":
        if (message.guild.voiceConnection) {
          message.channel.send("hehe~");
        }
        break;
      default:
        break;
    }
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.toLowerCase().includes("loli")
  ) {
    message.reply("Ahh a fewwow cutie I see UwU~~");
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.toLowerCase().includes("stop")
  ) {
    message.reply("hee-hee~~ we will nevwa stawp being weebuwus!!!~");
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.toLowerCase().includes("rawr")
  ) {
    message.reply("roooaawwwr~~ hehe~");
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.toLowerCase().includes("uwu")
  ) {
    message.reply("OwO");
  } else if (
    message.member.user.tag != "DegenerateBot#4865" &&
    message.content.toLowerCase().includes("owo")
  ) {
    message.reply("UwU");
  } else if (
    !message.content.includes("https://") &&
    !message.content.includes("http://")
  ) {
    var chance_for_random_message = Math.random();
    if (
      message.member.user.tag != "DegenerateBot#4865" &&
      message.member.user.tag != "Vexera#8487" &&
      chance_for_random_message >= 0 &&
      chance_for_random_message <= 0.2
    ) {
      uwuify(message);
    } else if (
      message.member.user.tag != "DegenerateBot#4865" &&
      message.member.user.tag != "Vexera#8487" &&
      chance_for_random_message > 0.25 &&
      chance_for_random_message <= 0.3
    ) {
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
          showRandomImage(message);
          break;
        default:
          break;
      }
    }
  }
});
