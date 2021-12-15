const discord = require('discord.js');
const { queues } = require('..');
const { msToHMS } = require('../utils');

module.exports = {
    run: async (args, message) => {
        if (!queues[message.guild.id]) return message.channel.send('Nothing is playing');
        if (!message.guild.voice.channel) return message.channel.send("Im not in a voice channel")

        const next = queues[message.guild.id].queue;

        if (next.length === 0) {
            return message.channel.send(new discord.MessageEmbed().setColor("PURPLE").setTitle("Nothing in queue"))
        }

            message.channel.send(
                new discord.MessageEmbed()
                    .setTitle("📜 Queue")
                    .setDescription(next.map((song, index) => `\n${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`))
                    .setColor("PURPLE")
            );
    },

    command: 'queue'
}