const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'tocarseguir',
    description: "A música reproduzida a seguir",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'A música que você quer tocar',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.editReply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Nenhum resultado encontrado ${inter.member}... tente novamente ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Desculpa, esse comando não suporta playlist ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.editReply({ content:`A música foi inserida na fila... ela será reproduzida a seguir🎧`});

    }
}
