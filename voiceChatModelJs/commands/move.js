import { SlashCommandBuilder, ChannelType } from 'discord.js';

const registerCommand = new SlashCommandBuilder()
  .setName('move')
  .setDescription('Move the bot to another voice channel')
  .addChannelOption((option) =>
    option.setName('channel').setDescription('channel to join').setRequired(true).addChannelTypes(ChannelType.GuildVoice)
  );

export default registerCommand.toJSON();