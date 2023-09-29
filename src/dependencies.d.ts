//@ts-check
/**
 * This file serves as intellisense for sern projects.
 * Types are declared here for dependencies to function properly
 * Service(s) api rely on this file to provide a better developer experience.
 */

import { SernEmitter, Logging, CoreModuleStore, ModuleManager, ErrorHandling, CoreDependencies, Singleton, Initializable } from '@sern/handler'
import { Client } from 'discord.js'
import { ModelManager } from './services/ModelManager.js'

declare global {
   interface Dependencies extends CoreDependencies {
        '@sern/client': Singleton<Client>,
        models: Initializable<ModelManager>
   }
}


export {}
