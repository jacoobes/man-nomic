import { ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle } from "discord.js";

/**
 * @param embeds { (import('discord.js').EmbedBuilder)[] }
 */
export function Paginate(embeds) {
    const __embeds = embeds;
    const [left, right] = [`${Date.now()}__left`, `${Date.now()}__right`]
    let cur = 0;
    const [ leftButton, rightButton ] = [
        new ButtonBuilder({ label : '<', custom_id : left, style: ButtonStyle.Primary}),			
        new ButtonBuilder({ label : '>', custom_id : right, style: ButtonStyle.Primary}),
    ];
    /**
     * @type import('discord.js').Message
     */
    let message;

    let _onLeft;
    let _onRight;

    return {
        onLeft (callback) {
            _onLeft = callback;
        },

        onRight(callback) {
            _onRight = callback;
        },
	async next() {
	    cur++;
	    if (cur >= __embeds.length) {
                cur = 0;
	    }
	    await message.edit(this.components());
	},
	async back() {
	    cur--;
	    if (cur <= -__embeds.length) {
		cur = 0;
	    }
	    await message.edit(this.components());
	},
	at(num) {
	    return __embeds.at(num);
	},

        async start(ctx) {
            message = await ctx.reply(this.components());
            if(__embeds.length > 1) {
                const collector = message
                    .channel
                    .createMessageComponentCollector({ 
                        componentType: ComponentType.Button
                    });
            
                collector.on('collect', async i => {
                    if (i.customId === left) {
                	await i.deferUpdate();
                        if(_onLeft != undefined) {
                	    await _onLeft?.();
                        } else {
                            await this.back();
                        }
                    } else if(i.customId === right) {
                	await i.deferUpdate();
                	await _onRight?.();
                        if(_onRight != undefined) {
                	    await _onLeft?.();
                        } else {
                            await this.next();
                        }
                    }
                }); 
                return () => {
                    collector.stop();
                }
            }
            //noop
            return () => {};
        },
	components() {
	    return {
		embeds: [__embeds.at(cur)],
		components: __embeds.length > 1
                    ? [
                         new ActionRowBuilder()
                            .addComponents(leftButton, rightButton)
		      ]
                    : undefined
	    };
	},
};
}
