const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Sem músicas tocando atualmente ... tente novamente  ❌`, ephemeral: true });

    if (!queue.tracks[0]) return  inter.reply({ content: `Sem música tocada antes de ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `e **${songs - 5}** outra(s) música(s)...` : `Na playlist **${songs}** música(s)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Requisitado por : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Server lista - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Tocando agora', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed], ephemeral: true });
}
