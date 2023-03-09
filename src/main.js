//https://discord.com/oauth2/authorize?client_id=1080968612535341117&permissions=8&scope=bot%20applications.commands
//https://discord.com/api/oauth2/authorize?client_id=1080968612535341117&permissions=8&scope=bot

//DISCORD_TOKEN=your-token-goes-here node index.js
//console.log(process.env.DISCORD_TOKEN);
const fs = require('node:fs');
const path = require('node:path');
const { serverCommands } = require('./server-commands.js');
const { Client, Collection, Events, GatewayIntentBits,Partials } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
	]
});

client.commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
