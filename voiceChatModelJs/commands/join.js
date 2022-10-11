import { SlashCommandBuilder, ChannelType } from 'discord.js';

const registerCommand = new SlashCommandBuilder()
  .setName('join')
  .setDescription('Ask the bot to join a voice channel')
  .addChannelOption((option) =>
    option.setName('channel').setDescription('channel to join').setRequired(true).addChannelTypes(ChannelType.GuildVoice)
  );

export default registerCommand.toJSON();