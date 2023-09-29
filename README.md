# man nomic 

### Information discord bot displaying models and other useful things in the [official gpt4all server](https://discord.gg/nomic-ai-1076964370942267462)

## Requirements to run locally
- node.js >= 18 and npm
- sern cli
    - `npm install -g @sern/cli`

## How to run (git clone this repository)
- run `npm install` (first time only)
- obtain discord token and client id
    - [guide to get started](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
    - insert these credentials in your .env file
- run `sern commands publish` in root directory of terminal
    - every time you add new commands, you'll need to republish to the discord API.
- run `npm start` in terminal
