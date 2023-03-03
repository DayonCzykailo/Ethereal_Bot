//https://discord.com/oauth2/authorize?client_id=1080968612535341117&permissions=8&scope=bot%20applications.commands

//DISCORD_TOKEN=your-token-goes-here node index.js
//console.log(process.env.DISCORD_TOKEN);

const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds] });


client.once(Events.ClientReady, cli => {
    console.log(`Pronto, Loggado como ${cli.user.tag} !!! (${new Date()})`);
});

client.on('messageCreate', message => {
    // Verifique se a mensagem foi enviada pelo próprio bot
    if (message.author.bot) return;
    console.log(message.content);
});



client.login(token);