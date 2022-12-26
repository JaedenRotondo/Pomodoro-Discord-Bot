// Import the corresponding libraries and information required
// to create the pomodiscord bot
const Discord = require("discord.js");
const { command_prefix, token } = require("./config.json");
const { Users } = require('./db/dbObjects.js');
const fs = require("fs");
// const { setUncaughtExceptionCaptureCallback } = require("process");

// Create a link to the discord client to our code
const client = new Discord.Client();

// Creates an extension of the Map, holding commands
client.commands = new Discord.Collection();

// Grab a list of the command folders
const commandFolders = fs.readdirSync('./commands');
const excludeFiles = ['timer.js'];

// Iterate through each folder
for (const folder of commandFolders){
  // Grab each command file in the folder
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  
  // Iterate through each file in the folder
  for (const file of commandFiles){
    const command = require(`./commands/${folder}/${file}`);
    if (excludeFiles.includes(file)){continue}
    client.commands.set(command.name, command);
  }
}

//
// Events
//

// Output to the console the bots user tag once it's ready to run
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Example of inserting creating and saving an entry into the table Users
  // try{
  //   const test = await Users.create({
  //     userid: '848611967748014130',
  //   });
  //   console.log('ran here');
  // }
  // catch (err) {
  //   console.error(err);
  // }
  const users = await Users.findAll();
  console.log(JSON.stringify(users, null, 2));
  
});

// Listen to an event where a message is entered
client.on('message', message => {
  // Create a command prefix that we can refer to for each message
	if (!message.content.startsWith(command_prefix) || message.author.bot) return;
  const args = message.content.slice(command_prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

  // Check if the command being looked for exists
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  // Check when required, the command requires arguments
  if (command.args && !args.length){
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  // Attempt to run the command (assuming it exists)
	try {
    // Calls the execute function inside the corresponding command file 
		command.execute(message, args, Discord, Users);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);