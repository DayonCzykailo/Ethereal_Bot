const maxVol = client.config.opt.maxVol;

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Sem músicas tocando atualmente ... tente novamente  ❌`, ephemeral: true });

        const vol = Math.floor(queue.volume - 5)

        if (vol < 0 ) return inter.reply({ content: `não consigo mais baixar o volume ${inter.member}... tente novamente ? ❌`, ephemeral: true })
        
        if (queue.volume === vol) return inter.reply({ content: `O volume que você deseja alterar já é o atual ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `O volume foi alterado para **${vol}**/**${maxVol}**% 🔊` : `Algo deu errado ${inter.member}... tente novamente ? ❌`, ephemeral: true});
}