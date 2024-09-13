const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// Read config.json file
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Skode® Studio');
  console.log('discord.gg/YhkyGV4Qd7');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content === '!line') {
    const member = message.guild.members.cache.get(message.author.id);
    if (!member) {
      message.reply('Could not find member information.');
      return;
    }

    const hasRole = member.roles.cache.some(role => role.id === config.requiredRoleId);

    if (hasRole) {
      try {
        await message.delete();
        await message.channel.send(config.imageUrl);
      } catch (error) {
        console.error('An error occurred while deleting the message or sending the link:', error);
      }
    } else {
      message.reply('Sorry, you do not have the required role to use this command.');
    }
  }
});

// Log in the bot with the token
client.login(config.token);
