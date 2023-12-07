const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('obtener-notas')
    .setDescription('obten las notas de tu usuario!'),
  async execute(interaction) {
    const id = interaction.user.id;
    // Get uset form db
    const user = db.prepare(`
    SELECT * FROM users
    WHERE user_id = ?
    `).get(id);

    if (!user) {
      return await interaction.reply('Su Usuario no existe');
    }

    //  Uptade User from bd
    db.prepare(`
    UPDATE USERS
    SET  title = ?
    SET description = ?
    WHERE user_id = ?
`).run(id);
    await interaction.reply(`La edad del ususario ha sido cambiada de ${user.age}`);
  },
};