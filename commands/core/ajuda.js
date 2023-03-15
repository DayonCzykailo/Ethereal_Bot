const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ajuda',
    description: "todos os comandos começam por /, acho que você já sabe KKKK",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('By Dayon - Ethereal')
        .addFields([ { name: `Habilitado - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'O cara usa Ajuda kkkkkkkk', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};