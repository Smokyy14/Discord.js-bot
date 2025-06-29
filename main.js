require("dotenv").config();
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  InteractionType 
} = require("discord.js");

const { loadCommands } = require("./handlers/loadCommands.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = loadCommands(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (interaction.type === InteractionType.ModalSubmit) {
    const command = commands.get("trade");
    if (command?.handleModalSubmit) {
      return command.handleModalSubmit(interaction);
    }
  }

  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
      console.error(`❌ Error in command "${interaction.commandName}":`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "An error occurred while executing the command.", ephemeral: true });
    } else {
      await interaction.reply({ content: "An error occurred while executing the command.", ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
