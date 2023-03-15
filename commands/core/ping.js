const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Ping do bot !",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`Pong! kkkk latência da API é ${Math.round(client.ws.ping)}ms 🛰️, Última batida de coração foi as  ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} atrás`)

    },
};