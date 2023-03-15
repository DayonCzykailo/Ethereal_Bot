module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Sem músicas tocando atualmente ... tente novamente  ❌`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Música ${queue.current.title} pausada ✅` : `Música  ${queue.current.title} continuando ✅`}`, ephemeral: true});
}