import CommandArgument from '../../res/models/CommandArgument.js';
import { NewsChannel, TextChannel } from 'discord.js';
export default class prune {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'prune';
        this.description = 'bulk delete a certain amount of messages in the channel.';
        this.commandUsage = '[amount]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('amount')
                .setDescription('Amount of message to delete. Has to be >0 and <1001.')
                .setMin(1)
                .setMax(1000),
        ];
    }
    async execute(msg, args) {
        const [givenAmount] = args;
        if (!msg.member.permissions.has('MANAGE_MESSAGES'))
            return await msg.reply("You don't have the permission to use this command!\nrequire: `Manage Messages`");
        const amount = givenAmount ? Number(givenAmount) + 1 : 2;
        if (!(msg.channel instanceof TextChannel || msg.channel instanceof NewsChannel))
            return;
        await msg.channel.bulkDelete(amount);
    }
}
