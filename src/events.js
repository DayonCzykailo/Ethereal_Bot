const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Erro na lista ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Erro na conexão ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Tocando algora ${track.title} em ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Voltar')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Proximo')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Continuar & Pausar')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Loop')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Lista')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`${track.title} adicionado na lista de músicas ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('ME EXPULSARAM, que crime,  limpando lista... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Eu sai do canal de voz, pois me abandonaram... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('Já toquei todas as muúsicas da lista ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Todas as músicas adicionadas na lista ✅`);
});