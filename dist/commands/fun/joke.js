import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import { Hina } from '../../res/config.js';
export default class joke {
    name;
    description;
    constructor() {
        this.name = 'joke';
        this.description = 'Allow me to tell you a joke.';
    }
    async execute(msg, args) {
        const req = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist');
        if (req.status !== 200)
            return await msg.reply('Sorry, something went wrong went making the request. Please try again.');
        const joke = await req.json();
        const content = joke.type === 'single'
            ? joke.joke
            : `${joke.setup.replace('`', '\\`')}\n||${joke.delivery.replace('`', '\\`')}||`;
        const embed = new MessageEmbed()
            .setColor(Hina.color)
            .setAuthor({ name: `Joke (${joke.category})`, iconURL: Hina.user.displayAvatarURL(Hina.imageOption) })
            .setFooter({
            text: `Requested by: ${msg.author.tag}`,
            iconURL: msg.author.displayAvatarURL(Hina.imageOption),
        })
            .setTimestamp()
            .setDescription(`${content}\n\n[source](https://v2.jokeapi.dev/)`);
        await msg.reply({ embeds: [embed] });
    }
}
