module.exports = {
    name: 'pausar',
    description: 'pausa a musica',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'A música esta pausada!', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `A música já esta pausada, ${inter.member}... tente novamente ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Música atual ${queue.current.title} pausada ✅` : `Algo deu errado ${inter.member}... tente novamente ? ❌` });
    },
};
