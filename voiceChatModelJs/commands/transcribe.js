import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('transcribe')
  .setDescription('Start transcribing speech');

export default registerCommand.toJSON();