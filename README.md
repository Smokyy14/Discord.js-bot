# 🤖 Discord.js Bot

A modular Discord bot developed with [discord.js v14](https://discord.js.org/), designed so anyone can clone it and easily build their own bot with custom commands.

## 🚀 Features

- ✅ Modular command structure (Slash Commands)
- ⚙️ Automatic command loading system

## 🧰 Requirements

- Node.js v18 or higher
- A bot account in the [Discord Developer Portal](https://discord.com/developers/applications)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Smokyy14/discord.js-bot.git
cd discord.js-bot
```

Set your variables in the .env file:
```bash
DISCORD_TOKEN=your_token_here
CLIENT_ID=your_clientID_here
GUILD_ID=your_guildID_here
```

Run this to:
```bash
npm run start
```
1. Install dependencies
2. Start the program
   
This will also automatically register the slash commands.

🗂️ Project structure
```shell
.
├── commands/            # Folder for your slash commands
├── handlers/
│   └── deploy.js        # 
│   └── loadCommands.js  # Dynamic command loader
├── .env                 # Token and sensitive configurations
├── package.json
└── main.js              # Main entry point of the bot
```

# 🛠️ How to Create a Command

## 📁 Location
All commands should be in this folder:

```bash
/commands/
```
Each command is a .js file that exports a valid Slash Command object, using the SlashCommandBuilder from discord.js.

# 🧱 Basic Structure of a Command

```js
// commands/ping.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('reply with Pong!'),

    async execute(interaction) {
    await interaction.reply('🏓 Pong!');
  },
};
```
# 🧩 Important Details
data: Defines the name and description of the command.
execute: This is the function that is executed when the user uses the command.

The bot already includes a system that automatically detects these files thanks to loadCommands.js.
You will need to restart the bot to be able to register slash commands.

## 🔄 Command not appearing?
Make sure:

The file is in /commands/
The bot has the correct application permissions
Handlers/deploy.js was successfully executed on startup

## 🤝 Contributions
Contributions are welcome! You can submit issues, suggestions, or pull requests.

## 📄 License
This project is under the ISC license. Use, modify, and distribute it as you wish.

## 🌐 Credits
Created by Smoky with 💙 for the Discord community.
