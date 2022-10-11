#####
# bot.py
# This was meant to be a transcribing and translating discord bot for voice channels.
#####

import discord
from discord import app_commands
import json

with open('config.json', 'r') as f:
    config = json.load(f)

TOKEN = config['BOT_TOKEN']
guild_object = discord.Object(id = config['GUILD_ID'])

class my_client(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.synced = False
    
    async def on_ready(self):
        await self.wait_until_ready()
        if not self.synced:
            await tree.sync(guild = guild_object)
            self.synced = True
        print(f'We have logged in as {self.user.name}')

client = my_client()
tree = app_commands.CommandTree(client)

@tree.command(name="ping", description="See if bot is online", guild = guild_object)
async def self(interaction: discord.Interaction):
    await interaction.response.send_message(f'Hello, I am awake')

@tree.command(name="echo", description="Echo command for discord", guild = guild_object)
async def self(interaction: discord.Interaction, text: str):
    await interaction.response.send_message(f'{text}')

@tree.command(name="connect", description="Connect to a specified voice channel", guild = guild_object)
async def self(interaction: discord.Interaction, channel: discord.VoiceChannel):
    await channel.connect()
    await interaction.response.send_message(f'Trevor joined {channel.mention}')

## Needed a transcribe and end command but those are not supported

@tree.command(name="disconnect", description="Disconnect from the specified voice channel", guild = guild_object)
async def self(interaction: discord.Interaction):
    guild = interaction.guild
    await guild.voice_client.disconnect()
    await interaction.response.send_message(f'Trevor left the voice channel')

client.run(TOKEN)