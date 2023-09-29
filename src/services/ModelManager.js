import { Colors, EmbedBuilder  } from 'discord.js'

const getModels = async () => {
    const modelsjson = await fetch("https://gpt4all.io/models/models.json");
    if(!modelsjson.ok) {
        throw Error("Failed to fetch json file"); 
    }
    return modelsjson.json();
}


const intoEmbed = ({ 
    name = "Unknown name",
    ramrequired,
    quant,
    type,
    parameters,
    filename,
    filesize,
    url,
    md5sum,
    requires,
    description,
    promptTemplate="??",
    systemTemplate="??"  
}) => {
    return new EmbedBuilder()
            .setTitle(`**_${name}_**`)
            .addFields([ 
                { name: 'File Name', value: filename },
                                { name: 'MD5Sum', value: md5sum },
                { name: 'Requires', value: requires ?? '??' },
                { name: 'File Size', value: (Number
                                                .parseInt(filesize) / 1E9)
                                                .toFixed(2)
                                                .toString() + " GBs", inline: true },

                { name: 'RAM required', value: ramrequired + " GB", inline: true },
                { name: 'Quant', value: quant, inline: true },
                { name: 'Family', value: type, inline: true },
                { name: 'Params', value: parameters, inline: true },
                { name: 'Download', value: `[link](${url ?? "https://gpt4all.io/index.html"})`, inline: true}
            ])
            .setColor(Colors.Blurple)
            .setDescription(`
                - **Description**: ${description}\n
                - **Prompt template**: ${JSON.stringify(promptTemplate)}\n
                - **System template**: ${JSON.stringify(systemTemplate)}\n
            `.trim());
}
/**
 * @implements Init {import('@sern/handler').Init}
 */
export class ModelManager {
    /**
     *@type Record<string,unknown>[]
     */
    models;
    
    async init() {
        this.models = await getModels();
    }
    get names() {
        return this.models.map(m => m.name);
    }
    intoEmbeds(models, maybeModelName) {
        if(maybeModelName) {
            const maybeModel=models.find(m => m.name === maybeModelName);
            if(maybeModel) {
                return [intoEmbed(maybeModel)];
            }
            return [];
        } else 
            return models
                .map(intoEmbed);
    }

}
