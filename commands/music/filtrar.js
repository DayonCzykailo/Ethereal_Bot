const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'filtro',
    description: 'Adicionar filtro na lista de música',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'Filtra o que você quer',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter, client }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... tente novamente ? ❌`, ephemeral: true });

        const actualFilter = queue.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

        if (!filter) return inter.reply({ content: `Este filtro não existe ${inter.member}... tente novamente ? ❌\n${actualFilter ? `Filtro ativado ${actualFilter}.\n` : ''}Filtros disponíveis ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        inter.reply({ content: `O filtro ${filter} agora é **${queue.getFiltersEnabled().includes(filter) ? 'Habilitado' : 'Desabilitado'}** ✅\n*Lembrete, quanto mais longa a música, mais isso levará.*` });
    },
};