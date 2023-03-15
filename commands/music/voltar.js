module.exports = {
    name: 'voltar',
    description: "volta para a música anterior",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Sem música tocada antes de ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Playing the **previous** track ✅`});
    },
};