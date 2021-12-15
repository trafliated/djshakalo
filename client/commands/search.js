const discord = require('discord.js');
const { queues } = require('..');
const Queue = require('../structures/Queue');
const { msToHMS } = require('../utils');

module.exports = {
    run: async (args, message) => {
        if (!args[0]) return message.channel.send(`Please provide a song`);
        if (!message.member.voice.channel.id) return message.channel.send("You must be in a voice channel!");
        // if (!message.guild.me.voice.channel) return message.channel.send("Im not in a voice channel")

        if (!queues[message.guild.id])
            queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);

        const allSongs = await queues[message.guild.id].search(args.join(' '));
        if (!allSongs || allSongs.length == 0) return message.channel.send(`Unknown song`);

        try {
            var songs = allSongs.slice(0, 10)
        } catch (e) {
            console.error(e)
            songs = allSongs.slice(0, 5)
        }

        const options = songs.map((song, index) => `${++index}) ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);

        const msg = await message.channel.send(
            new discord.MessageEmbed()
                .setTitle("🔎 Search Results - Type cancel to cancel")
                .setDescription(options.join("\n\n"))
                .setColor("PURPLE")
        );

        const chosenSong = (await msg.channel.awaitMessages(msg => msg.author === message.author && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'cancel'].includes(msg.content), { max: 1 })).first().content;
        if (chosenSong === "cancel") return message.channel.send('Canceled');

        const song = songs[parseInt(chosenSong) - 1];

        const isAdded = await queues[message.guild.id].play(song);

        if (isAdded) {
            message.channel.send(
                new discord.MessageEmbed()
                    .setTitle("🎶 Added to queue: " + song.info.title)
                    .addFields([
                        { inline: true, name: "Author", value: song.info.author },
                        { inline: true, name: "Length", value: msToHMS(song.info.length) },
                        { inline: true, name: "Link", value: song.info.uri }
                    ])
                    .setColor("PURPLE")
            )
        }
    },

    command: 'search'
}