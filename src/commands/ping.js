import { CommandType, commandModule } from '@sern/handler';

export default commandModule({
    type: CommandType.Slash,
    description: "Ping!",
    execute: async (ctx) => {
        await ctx.reply('Pong 🏓');
    },
});
