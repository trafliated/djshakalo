const discord = require('discord.js');
const { queues } = require('..');
const { msToHMS } = require('../utils');

module.exports = {
    run: async (args, message) => {
        if (!queues[message.guild.id]) return message.channel.send('Nothing is playing');
        if (!message.guild.voice.channel) return message.channel.send("Im not in a voice channel")

        const song = queues[message.guild.id].currentlyPlaying;

        message.channel.send(
            new discord.MessageEmbed()
                .setTitle("🎶 Currently playing: " + song.info.title)
                .addFields([
                    { inline: true, name: "Author", value: song.info.author },
                    { inline: true, name: "Length", value: msToHMS(song.info.length) },
                    { inline: true, name: "Link", value: song.info.uri }
                ])
                .setColor("PURPLE")
        );
    },

    command: 'np'

}