const mongoose = require('mongoose');
const client = require('../main.js');
client.config = require("../config.json")

async function connect() {
    mongoose.connect(client.config.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log('[DATABASE]: Conncted to Database')
    });
    return;
}

module.exports = connect;