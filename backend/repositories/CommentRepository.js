const Comment = require('../models/Comment.js');

async function listAllFrom(companyId) {
    try {
        const comments = await Comment.findAll({
            where: {
                companyId: companyId
            }
        });

        return comments.dataValues;
    } catch(err) {
        throw err;
    }
}

async function submit(clientId, companyId, text) {
    try {
        const comment = await Comment.create({
            clientId: clientId,
            companyId: companyId,
            text: text
        });

        return comment;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    listAllFrom,
    submit
}