const discord = require('discord.js');
const { queues } = require('..');

module.exports = {
    run: async (args, message) => {
        if (!message.member.voice.channel.id) return message.channel.send("You must be in a voice channel!");
        if (!message.guild.voice.channel) return message.channel.send("Im not in a voice channel")
        if (!queues[message.guild.id]) return message.channel.send(new discord.MessageEmbed().setTitle("Nothing is playing").setColor("PURPLE"));
        if (!args[0]) return message.channel.send(new discord.MessageEmbed().setTitle("Change volume from 0-150").setColor("PURPLE"))
        if (isNaN(args[0])) return message.channel.send(new discord.MessageEmbed().setTitle("Enter a valid volume from 0-150").setColor("PURPLE"))
        // if (parseInt(args[0]) > 150) return message.channel.send(new discord.MessageEmbed().setTitle("Change volume from 0-150").setColor("PURPLE"))

        await queues[message.guild.id].changeVol(args[0])
        message.channel.send(
            new discord.MessageEmbed()
                .setTitle(`Volume set to ${args[0]}`)
                .setColor("PURPLE")
        )

    },

    command: 'volume'
}

