import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('leave')
  .setDescription('Ask the bot to leave the voice channel');

export default registerCommand.toJSON();