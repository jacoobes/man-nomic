import { CommandType, Service, commandModule } from "@sern/handler";
import { ApplicationCommandOptionType } from "discord.js";
import { Paginate } from "../utils/Paginator.js";


export default commandModule({ 
    type: CommandType.Slash,
    description: 'Display known models',
    options: [
        {  
            type: ApplicationCommandOptionType.String,
            name: "name",
            description: "Display singular model",
            autocomplete: true,
            command: {
                onEvent: [],
                execute: async (a) => {
                    const modelManager = Service('models');
                    const focused = a.options.getFocused()
                    await a.respond(
                        modelManager
                            .names
                            .filter(n => n.includes(focused))
                            .map(m => ({ name: m, value: m})))
                    
                } 
            }
        }
    ],
    execute: async (ctx) => {
        const modelManager = Service('models');
        const option = ctx.options.getString('name');
        const { models } =  modelManager,
              embeds = modelManager.intoEmbeds(models, option);
        
        const paginator = Paginate(embeds);
        let stop;
        try {
            stop = await paginator.start(ctx);
        } catch(E){
            stop?.();
        }
    }
})
