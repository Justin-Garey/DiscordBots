import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('pokemon')
  .setDescription('Connection to a pokemon api to get information about a pokemon')
  .addStringOption(option =>
    option.setName('pokemon')
        .setDescription('The pokemon to fetch')
        .setRequired(true));

export default registerCommand.toJSON();