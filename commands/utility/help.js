//const {pomo} = require('../../config.json'); 
const fs = require("fs");

// Tries to get our command prefix
var file;
try {
    var file = fs.readFileSync('./config.json', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}
const command_prefix = JSON.parse(file).command_prefix;

// help command 
module.exports = {
	name: 'help',
	description: 'Help you navigate all commands',
	usage: '[command name]',
	cooldown: '3 seconds',
	execute(message, args) {
    // const help = args[0].toLowerCase();
    // console.log(help);
		// const command = message.client.commands.get(command)
    // console.log(command);
    const data = [];
    const { commands } = message.client;
  if (!args.length) {
    data.push('Here\'s a list of all my commands:');
    data.push(commands.map(command => command.name).join(', '));
    data.push(`\nYou can send \`${command_prefix}help [command name]\` to get info on a specific command!`);
  
		return message.channel.send(data, { split: true});

		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
      }
		} 
const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
  data.push(`**Name:** ${command.name}`);
  if (command.description) data.push(`**Description:** ${command.description}`);
  data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
  message.channel.send(data, { split: true });
  if(command.url) data.push(`**Info** ${command.url}`);
	},
};