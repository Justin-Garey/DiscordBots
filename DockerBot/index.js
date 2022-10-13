import {
  Client,
  GatewayIntentBits,
  Routes,
} from "discord.js";
import { REST } from "@discordjs/rest";

import ping from "./commands/ping.js";
import echo from "./commands/echo.js";
import pokemon from "./commands/pokemon.js";

import config from "./config.json" assert { type: "json" };

// Counter for commands for logs
let command_count = 0;

const TOKEN = config.BOT_TOKEN;
const CLIENT_ID = config.CLIENT_ID;
const GUILD_ID = config.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => console.log(`${client.user.tag} is now online`));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    command_count++;
    // Ping
    if (interaction.commandName === "ping") {
      console.log(`\n${command_count}: ping`);
      interaction.reply("Hello, I am awake!");
    }
    // Echo
    else if (interaction.commandName === "echo") {
      console.log(`\n${command_count}: echo`);
      const text = interaction.options.getString("input");
      interaction.reply(`${text}`);
    }
    // Pokemon
    else if (interaction.commandName === "pokemon") {
      console.log(`\n${command_count}: pokemon`);
      const pokemon = interaction.options.getString("pokemon");
      try {
        const pokeInfo = await getPokemon(pokemon);
      
        const pokeEmbed = {
          title: `${pokemon}`,
          fields: [
            {
              name: `${pokeInfo.stats[0].stat.name}`,
              value: `${pokeInfo.stats[0].base_stat}`,
              inline: true,
            },
            {
              name: `${pokeInfo.stats[1].stat.name}`,
              value: `${pokeInfo.stats[1].base_stat}`,
              inline: true,
            },
            {
              name: `${pokeInfo.stats[2].stat.name}`,
              value: `${pokeInfo.stats[2].base_stat}`,
              inline: true,
            },
            {
              name: '\u200b',
              value: '\u200b',
              inline: false,
            },
            {
              name: `${pokeInfo.stats[3].stat.name}`,
              value: `${pokeInfo.stats[3].base_stat}`,
              inline: true,
            },
            {
              name: `${pokeInfo.stats[4].stat.name}`,
              value: `${pokeInfo.stats[4].base_stat}`,
              inline: true,
            },
            {
              name: `${pokeInfo.stats[5].stat.name}`,
              value: `${pokeInfo.stats[5].base_stat}`,
              inline: true,
            },
          ],
          image: {
            url: `${pokeInfo.sprites.front_default}`,
          },
          footer: {
            text: "From PokeAPI",
          },
        };
      
        await interaction.reply({ embeds: [pokeEmbed]});
      } catch {
        interaction.reply("That is not a pokemon.");
      }
    }
  }
});

async function getPokemon(pokemon) {
  const pokeInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return pokeInfo.json();
}

async function main() {
  const commands = [ping, echo, pokemon];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
