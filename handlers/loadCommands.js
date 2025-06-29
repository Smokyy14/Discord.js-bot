const fs = require("fs");
const path = require("path");

function loadCommands(dirPath) { 
const commands = new Map(); 

function load(dir) { 
  const files = fs.readdirSync(dir); 
  for (const file of files) { 
    const fullPath = path.join(dir, file); 
    const stat = fs.statSync(fullPath); 

    if (stat.isDirectory()) { 
      load(fullPath); 
  } else if (file.endsWith(".js")) { 
      const command = require(fullPath); 
    if (command.data?.name && typeof command.execute === "function") { 
      commands.set(command.data.name, command); // Only the slash name is needed
      console.log(`✅ Loaded slash command: ${command.data.name}`);
    } else {
        console.warn(`⚠️ Ignored file: ${file} (does not export data.name or execute)`);  
      }
    }
  }
}

load(dirPath);
return commands;
}

module.exports = { loadCommands };
