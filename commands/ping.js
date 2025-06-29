const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Respond with Pong and measure bot latency"),

    async execute(interaction) {
      const start = Date.now();

      await interaction.deferReply(); 
      
      const latency = Date.now() - start;
      const emoji = latency <= 50 ? "🟢" : latency <= 150 ? "🟡" : "🔴";

      await interaction.editReply(`🏓 Pong!\n${emoji} \`${latency} ms\``);
  }
}
