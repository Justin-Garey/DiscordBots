import { Client, GatewayIntentBits, Routes, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { createWriteStream } from "node:fs";
import prism from "prism-media";
import { pipeline } from "node:stream";
import {
  getVoiceConnections,
  joinVoiceChannel,
  VoiceReceiver,
  entersState,
  VoiceConnectionStatus,
  EndBehaviorType,
  AudioReceiveStream,
} from "@discordjs/voice";

import ping from "./commands/ping.js";
import echo from "./commands/echo.js";
import join from "./commands/join.js";
import leave from "./commands/leave.js";
import move from "./commands/move.js";
import record from "./commands/record.js";
import stop from "./commands/stop.js";
import transcribe from "./commands/transcribe.js";
import translate from "./commands/translate.js";
import status from "./commands/status.js";

import config from "./config.json" assert { type: "json" };

// Counter for commands for logs
let command_count = 0;
// Connection to voice channel
let voiceConnection;
let voiceChannel;

const TOKEN = config.BOT_TOKEN;
const CLIENT_ID = config.CLIENT_ID;
const GUILD_ID = config.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.voiceManager = new Collection();

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
    // Join
    else if (interaction.commandName === "join") {
      console.log(`\n${command_count}: join`);
      voiceChannel = interaction.options.getChannel("channel");
      voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
      interaction.reply(`Joined ${voiceChannel}`);
    }
    // Move
    else if (interaction.commandName === "move") {
      console.log(`\n${command_count}: move`);
      voiceConnection.destroy();
      voiceChannel = interaction.options.getChannel("channel");
      voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
      interaction.reply(`Moved to ${voiceChannel}`);
    }
    // Record
    else if (interaction.commandName === "record") {
      console.log(`\n${command_count}: record`);
      interaction.reply("Started recording");
    }
    // Transcribe
    else if (interaction.commandName === "transcribe") {
      console.log(`\n${command_count}: transcribe`);
      interaction.reply("Started transcribing");
    }
    // Translate
    else if (interaction.commandName === "translate") {
      console.log(`\n${command_count}: translate`);
      interaction.reply("Started translating");
    }
    // Stop
    else if (interaction.commandName === "stop") {
      console.log(`\n${command_count}: stop`);
      voiceConnection.destroy();
      interaction.reply("Stopped recording");
    }
    // Leave
    else if (interaction.commandName === "leave") {
      console.log(`\n${command_count}: leave`);
      voiceConnection.destroy();
      voiceConnection.interaction.reply("Left the voice channel");
    }
    // Status
    else if (interaction.commandName === "status") {
      console.log(`\n${command_count}: status`);
      console.log(interaction.guild.members.me.voice);
      const voice = interaction.guild.members.me.voice;
      interaction.reply(
        `Server Deafened: ${voice.serverDeaf}\nSelf Deafened: ${voice.selfDeaf}`
      );
    }
  }
});

async function main() {
  const commands = [
    ping,
    echo,
    join,
    leave,
    move,
    record,
    stop,
    transcribe,
    translate,
    status,
  ];
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
