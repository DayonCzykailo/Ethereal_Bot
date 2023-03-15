const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'habilitar ou desabilitar o loop da música ou de toda a fila',
    voiceChannel: true,
    options: [
        {
            name: 'action',
            description: 'qual ação você deseja executar no loop',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Lista', value: 'enable_loop_queue' },
                { name: 'Desabilitar', value: 'disable_loop' },
                { name: 'Musica', value: 'enable_loop_song' },
            ],
        }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content: `Você deve primeiro desativar a música atual no modo de loop (/loop Desabilitar) ${inter.member}... tente novamente ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

                return inter.reply({ content: success ? `Modo de repetição **Habilitado** toda a fila será repetida indefinidamente 🔁` : `Algo deu errado ${inter.member}... tente novamente ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content: success ? `Modo de repetição **Desabilitado**` : `Algo deu errado ${inter.member}... tente novamente ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content: `Você deve primeiro desativar a música atual no modo de loop (/loop Desabilitar) ${inter.member}... tente novamente ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                return inter.reply({ content: success ? `Modo de repetição **Habilitado** a música atual será repetida indefinidamente (você pode parar o loop usando  /loop Desabilitar)` : `Algo deu errado ${inter.member}... tente novamente ? ❌` });
                break
            }
        }

    },
};