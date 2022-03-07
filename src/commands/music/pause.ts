import { Message } from 'discord.js';
import { BaseCommand } from 'hina';

export default class pause implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'pause';
        this.description = 'clear server song queue.';
    }

    async execute(msg: Message, args: string[]) {
        await msg.reply('Sorry, music commands are currently down. They will be back in the next version. (v2.2.0)');
    }
}