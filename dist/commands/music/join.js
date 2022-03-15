import { Hina } from '../../res/config.js';
export default class join {
    name;
    description;
    constructor() {
        this.name = 'join';
        this.description = 'I will join your voice channel.';
    }
    async execute(msg, args) {
        if (!msg.member.voice.channel)
            return await msg.reply('Please join a voice channel!');
        const queue = Hina.player.getQueue(msg.guild);
        if (!queue) {
            const queue = Hina.player.createQueue(msg.guild, {
                ytdlOptions: {
                    quality: 'highest',
                    filter: 'audioonly',
                    highWaterMark: 1 << 25,
                    dlChunkSize: 0,
                },
                metadata: {
                    channel: msg.channel,
                },
                leaveOnEnd: false,
                leaveOnStop: false,
                leaveOnEmptyCooldown: 180000,
                initialVolume: 50,
            });
            await queue.connect(msg.member.voice.channel);
        }
        if (msg.member.voice.channelId !== msg.guild.me.voice.channelId) {
            await queue.connect(msg.member.voice.channel);
        }
        await msg.reply(Hina.okEmoji);
    }
}
