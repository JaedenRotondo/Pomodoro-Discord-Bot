const Timer = require("./timer.js");
module.exports = {
  name: 'long',
  cooldown: '0',
  description: `Help you study with Pomodoro trains. For more information, click here:`,
  url: 'https://luxafor.com/the-ultimate-guide-how-to-use-pomodoro-technique-when-working-on-different-tasks/',
  aliases: ['extravagant', 'long', '50'],
  usage: '+pomo <long/50>',
	execute(message, args, Discord, Users) {


    //
    // Start of command details
    //

    // Constant to indicate a short pomodoro session (in miliseconds)
    const ONE_SECOND = 1000;
    const POM_TIME = 5;

    // Create EMBED uncommentt from here*** to ***
    const userInfoEmbed = new Discord.MessageEmbed()
    .setColor('#EC0101')
    .setTitle('POMO BOT')
    .setAuthor(`${message.author.username}#${message.author.discriminator}`)
    .setDescription(`Pomodo Timer Stats`)
    .setThumbnail('https://www.pngfind.com/pngs/m/564-5648078_tomato-sticker-tomato-cute-hd-png-download.png')
    .addFields(
      { name: 'Time studied this session is:', value: `${POM_TIME} seconds`},
    ) // here for the *** EMBED ***

    // Start the timer
    timer = new Timer(POM_TIME * ONE_SECOND, message, userInfoEmbed, Discord, Users);
    timer.start();
	},
};