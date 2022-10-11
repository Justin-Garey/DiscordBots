import { SlashCommandBuilder, ChannelType } from 'discord.js';

const registerCommand = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Check the status of the bot')

export default registerCommand.toJSON();