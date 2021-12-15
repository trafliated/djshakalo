const {client} = require("../index.js");
const { lavacordManager } = require("..");
const config = require('../config.json')

module.exports = {
    run: () => {
        console.log('Ready, connecting to lavalink.');

        client.user.setActivity("mohab sleep", { type: "WATCHING" })
        // client.user.setActivity("سواق قطر ستة الا تلت", { type: "WATCHING" })

        lavacordManager.connect().then(success => {
            console.log(`Connected to ${success.filter(ws => ws != null).length} lavalink node(s) out of ${config.nodes.length} total node(s).`);
        }).catch(err => {
            console.error(`Error connecting to lavalink.`, err);
            process.exit(1);
        });
    },

    eventName: 'ready'
}