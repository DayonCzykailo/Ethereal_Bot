module.exports = async (client) => {
    console.log(`Logado ${client.user.username}\n-> Pronto: ${client.guilds.cache.size} Servers /  ${client.users.cache.size} Usuários`);
    client.user.setActivity(client.config.app.playing);
};