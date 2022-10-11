# Discord Bots
All the bots in any language I work on are stored here. 

## Bots:
A list of the discord bots I have made, they are all in a working condition as of when I stopped working on them.

For each bot, put a config.json file in the bots directory with your information in it.
- It should look like this:
```
{
    "BOT_TOKEN": "bot token goes here",
    "GUILD_ID": "guild id goes here",
    "CLIENT_ID": "client id goes here",
    "APP_ID": "application id goes here"
}
```

### voiceChatModelPy:
- Run with python bot.py
- The intent was to make a discord bot that could listen and record the voice chat but that happened to not be possible in python.
- The bot can also be used a starting model as it is very easy to modify for other purposes.

### voiceChatModelJs:
- Do an npm i in the directory
- node index.js will start the bot
- Same intent as the Python bot but documentation sucks. This will be a work in progress to improve.
- Also can be easily manipulated for other purposes.

### Tr-Tr-Trevor
- Discord bot made using rust and Serenity (The rust discord api implementation).
- [Trevor](https://github.com/Justin-Garey/DroppingOut)

## Links to other useful bots
- [JS Discord Voice Recorder](https://github.com/chebro/discord-voice-recorder)