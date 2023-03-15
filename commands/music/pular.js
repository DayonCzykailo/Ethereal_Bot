const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'pular',
    description: "Pula para uma música em particular da lista de músicas",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome/URL da música que você quer pular',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'A posição da música que você quer pular',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Você tem que usar uma das opções para pular para uma música ${inter.member}, bobão... tente novamente ? ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `Pulado para ${track} ✅` });
            }
        }
        return inter.reply({ content: `Não pude encontrar ${track} ${inter.member}... tente usar a url ou o nome completo da música ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Esta faixa da lista parece não existir ${inter.member}...  tente novamente ?❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `Pulado para ${trackname}  ✅` });
    }
         
    }
}