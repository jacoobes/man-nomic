import { IntentsBitField } from "discord.js";

const intents =	IntentsBitField.Flags.Guilds |
	        IntentsBitField.Flags.GuildMembers |
	        IntentsBitField.Flags.GuildMessages |
	        IntentsBitField.Flags.MessageContent //Make sure this is enabled for text commands!

/**
 *@type {import('discord.js').ClientOptions}
 */
export const config = {
    intents,
    sweepers: {
        messages: {
            interval: 43_200,
	    lifetime: 21_600,
        },
    }
};
