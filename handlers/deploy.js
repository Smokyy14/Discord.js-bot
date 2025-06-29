require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const commands = [];

const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`⚠️ The command in ${file} does not have "data" or "execute"`); 
  }
}

const rest = new REST({ version: "10" }).setToken(token);

  (async() => { 
    try { 
      console.log("🔁 Logging slash commands..."); 
      await rest.put( 
        Routes.applicationGuildCommands(clientId, guildId), 
      { body: commands } 
    ); 
      console.log("✅ Commands logged successfully."); 
  } catch (error) { 
    console.error("❌ Error registering commands:", error); 
  }
})();
