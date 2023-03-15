module.exports = {
    name: 'parar',
    description: 'para de tocar as músicas',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `As Músicas pararam nesse servidor, até a próxima ✅`});
    },
};