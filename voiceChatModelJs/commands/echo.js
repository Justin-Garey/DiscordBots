import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Echo command built into discord')
  .addStringOption(option =>
    option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true));

export default registerCommand.toJSON();