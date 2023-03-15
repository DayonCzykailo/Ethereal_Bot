module.exports = {
    name: 'continuar',
    description: 'continua a música pausada',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `A música já está tocando, ${inter.member}... tente novamente ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Musica ${queue.current.title} continuando ✅` : `Algo deu errado ${inter.member}... tente novamente ? ❌`});
    },
};
