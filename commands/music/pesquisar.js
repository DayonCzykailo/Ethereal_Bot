const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'pesquisar',
    description: 'pesquisa uma música',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'música que você quer pesquisar',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Nenhum resultado encontrado ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `Resultados para ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelecione entre **1** r **${maxTracks.length}** ou **cancelar** ⬇️`)
        .setTimestamp()
        .setFooter({ text: 'Ethereal', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancelar') return inter.followUp({ content: `Pesquisa cancelada ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `Resposta inválida, tente um valor entre **1** e **${maxTracks.length}** ou **cancelar**... try again ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Não consigo entrar no canal de voz${inter.member}... tente novamente ? ❌`, ephemeral: true });
            }

            await inter.followUp(`Carregando sua pesquisa... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`O tempo da pesquisa expirou ${inter.member}... tente novamente ? ❌`, ephemeral: true })
        });
    },
};