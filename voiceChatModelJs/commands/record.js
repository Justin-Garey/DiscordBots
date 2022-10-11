import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('record')
  .setDescription('Start recording in a vocie channel');

export default registerCommand.toJSON();