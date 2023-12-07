const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-notas')
    .setDescription('Crea tu nota!')
    .addStringOption(option => option
      .setName('title')
      .setDescription('Nombra a tu nota')
      .setRequired(true),
    )
    .addStringOption(option => option
      .setName('description')
      .setDescription('Describe tu nota')
      .setRequired(true),
    ),
  async execute(interaction) {
    const id = interaction.user.id;
    const email = interaction.options.getString('title');
    const age = interaction.options.getString('description');
    const CreateUserStmlt = db.prepare(`
    INSERT INTO users (description, title, user_id) VALUES (?, ?, ?)
    `);
    CreateUserStmlt.run(email, age, id);
    console.log(email, age, id);
    await interaction.reply('Nota creada!');
  },

};
