const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'ajuste no audio',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'a quantidade de volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.volume === vol) return inter.reply({ content: `O volume que você deseja alterar já é o atual ${inter.member}...tente novamente ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `O volume foi alterado para **${vol}**/**${maxVol}**% 🔊` : `Algo deu errado ${inter.member}... tente novamente ? ❌`});
    },
};