import { execSync } from 'child_process'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

if(!existsSync(".env")) {
    console.warn("WARNING: env file not found, making one from .env.example");
    const src = resolve('.env.example'),
          dest= resolve('.env'); 
    try {
        copyFileSync(src, dest)
    } catch(e) {
        console.error("Failed to copy .env.example to .env")
        throw e
    }
}

try {
    execSync('sern --version')
} catch(e) {
    console.warn("WARNING: Install the sern cli via npm:");
    console.warn("WARNING: npm install -g @sern/cli");
    console.warn("WARNING: Ignore this if you do not need to publish your commands to the discord api")
}


