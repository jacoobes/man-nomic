import { CommandType, commandModule } from "@sern/handler";
import { ApplicationCommandOptionType } from "discord.js";

export default commandModule({ 
    type: CommandType.Slash,
    description: 'Display gpt4all documentation from website',
    options: [
        { 
            type: ApplicationCommandOptionType.String,
            name: 'section',
            description: 'Provide link to section of website',
            required: true,
            choices: [
                "gpt4all_chat.html",
                "index.html",
                "gpt4all_typescript.html",
                "gpt4all_nodejs.html",
                "gpt4all_cli.html",
                "gpt4all_faq.html",
            ].map(pg => ({ name: pg.replace(".html", ""), value: pg }))
        },
        {
            type: ApplicationCommandOptionType.User,
            name: 'user',
            description: 'Mention someone',
        }
    ],
    execute: async (ctx) => {
        const baselink =  "https://docs.gpt4all.io/",
              usr = ctx.options.getUser('mention'),
              dest = ctx.options.getString('section'),
              mention = usr ? usr.toString() : '';
        await ctx.reply({
            allowedMentions: {
                repliedUser: false 
            },
            content: `${mention} [Information](${new URL(dest, baselink)})`, 
        });   
    }
})

