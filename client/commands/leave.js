const discord = require("discord.js")
const { queues } = require("..")

module.exports = {
    run: (args, message) => {
        if (!message.member.voice.channel.id) return message.channel.send("You must be in a voice channel!");
        if (!message.guild.voice.channel) return message.channel.send("Im not in a voice channel")

        queues[message.guild.id].destroy();
        message.channel.send(
            new discord.MessageEmbed()
                .setTitle("👋 Goodbye")
                .setColor("PURPLE")
        )
    },

    command: 'dc'
}