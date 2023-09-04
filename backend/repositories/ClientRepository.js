const Client = require('../models/Client.js');

async function createClient(name, email, password) {
    try {
        const client = await Client.create({
            name: name,
            email: email,
            password: password
        });

        return client.dataValues;
    } catch(err) {
        throw err;
    }
}

async function findOneBy(value, columnName) {

}

module.exports = Object.freeze({
    createClient,
    findOneBy
})