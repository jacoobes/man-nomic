/// <reference path="dependencies.d.ts" />
import { Client } from 'discord.js';
import { Sern, single, makeDependencies } from '@sern/handler';
import { config } from './config.js';
import { ModelManager } from './services/ModelManager.js';

const client = new Client(config);

/**
 * Where all of your dependencies are composed.
 * '@sern/client' is usually your Discord Client.
 * This is used for external event modules as well
 */
await makeDependencies({
    build: (root) => root
        .add({
            '@sern/client': single(() => client),
             models: new ModelManager()
        }),
});

//View docs for all options
Sern.init({
    //defaultPrefix: '!', // removing defaultPrefix will shut down text commands
    commands: 'src/commands',
    // events: 'src/events', //(optional)
});

client.login();
