const { queues } = require("../index.js")

module.exports = {
    run: async (oldState, newState) => {
        if (!oldState.member.user.bot) return
        if (oldState.member.id !== "902261568996245504") return

        if (oldState && (newState.channelID === null || typeof newState.channelID == 'undefined')) {
            await queues[oldState.member.guild.id].destroy()
            // const queue = queues[oldState.member.guild.id].queue
            // if (queue.length === 0) {
            //     await queues[oldState.member.guild.id]._playNext()
            // } else {
            //     await queues[oldState.member.guild.id].stop()
            // }
        }
    },

    eventName: 'voiceStateUpdate'
}