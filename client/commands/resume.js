const discord = require('discord.js');
const { queues } = require('..');

module.exports = {
    run: async (args, message) => {
        if (!message.member.voice.channel.id) return message.channel.send("You must be in a voice channel!");
        if (!message.guild.voice.channel) return message.channel.send("Im not in a voice channel")
        if (!queues[message.guild.id]) return message.channel.send(new discord.MessageEmbed().setTitle("Nothing is playing").setColor("PURPLE"));

        if (!(await queues[message.guild.id].isPaused())) {
            await queues[message.guild.id].resume()
            message.channel.send(
                new discord.MessageEmbed()
                    .setTitle("Resumed")
                    .setColor("PURPLE")
            )
        } else {
            message.channel.send(new discord.MessageEmbed().setColor("PURPLE").setTitle("Song is already resumed"))
        }


    },

    command: 'resume'
}