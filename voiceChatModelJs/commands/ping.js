import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check if the bot is online');

export default registerCommand.toJSON();