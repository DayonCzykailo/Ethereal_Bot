module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Sem música tocando agora... tente novamente ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Sem música tocada antes de ${inter.member}... tente novamente ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Tocando **previous**  ✅`, ephemeral: true});
}
