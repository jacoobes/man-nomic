import { CommandType, commandModule } from "@sern/handler";
import { ApplicationCommandOptionType } from "discord.js";

export default commandModule({ 
    type: CommandType.Slash,
    description: "Flip a coin",
    options: [
        { 
            type : ApplicationCommandOptionType.String,
            name: "choose",
            description: "Pick a side",
            required: true,
            choices: [
                { name: "Heads", value: "heads" },
                { name: "Tails", value: "tails" }
            ]
        }   
    ],
    execute: async (ctx) => {
        const options =  ["heads", "tails"],
              choice = ctx.options.getString('choose', true),
              won = options[Math.round(Math.random())];
        await ctx.reply(`You chose: **${choice}**, got: **${won}**`);
    }
})
