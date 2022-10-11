import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('The bot will stop whatever it is doing');

export default registerCommand.toJSON();