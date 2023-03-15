module.exports = {
    name: 'proximo',
    description: 'salta para a próxima música',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Música atual ${queue.current.title} pulada ✅` : `Algo deu errado ${inter.member}... tente novamente ? ❌`});
    },
};