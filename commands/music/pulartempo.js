const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'pulartempo',
    description: 'pula o tempo para trás ou para frente em uma música',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'tempo que você deseja pular para',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`O tempo indicado é maior que o tempo total da música atual ${inter.member}... try again ? ❌\n*Tente, por exemplo, um tempo válido como **5s, 10s, 20 segundos, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Time set on the current song **${ms(timeToMS, { long: true })}** ✅`});
    },
};