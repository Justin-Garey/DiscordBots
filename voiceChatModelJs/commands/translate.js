import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('Start translating speech');

export default registerCommand.toJSON();