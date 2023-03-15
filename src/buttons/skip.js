module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Sem músicas tocando atualmente ... tente novamente  ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Música ${queue.current.title} pulada ✅` : `Deu algo errado ${inter.member}... tente novamente ? ❌`, ephemeral: true});
}