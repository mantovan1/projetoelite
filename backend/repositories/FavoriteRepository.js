const Favorite = require('../models/Favorite.js');

async function add(clientId, companyId) {
    try {
        const favorite = await Favorite.create({
            clientId,
            companyId
        });
        return favorite;
    } catch(err) {
        throw err;
    }
}

async function list(clientId) {
    try {
        const favorites = await Favorite.findAll({
            where: {
                clientId: clientId
            }
        });

        return favorites;
    } catch(err) {
        throw err;
    }
}

async function check(clientId, companyId) {
    try {
        const favorite = await Favorite.findOne({
            where: {
                clientId: clientId,
                companyId: companyId
            }
        });

        if (favorite.dataValues) {
            return true
        } else {
            return false
        }
    } catch(err) {
        throw err;
    }
}

module.exports = Object.freeze({
    add,
    list,
    check
})