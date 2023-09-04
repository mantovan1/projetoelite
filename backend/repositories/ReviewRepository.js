const Review = require('../models/Review.js');

async function checkReview(clientId, companyId) {
    try {
        const review = await Review.findOne({where: {
            clientId: clientId,
            companyId: companyId
        }});
        return review;
    } catch(err) {
        throw err;
    }
}

async function publish(clientId, companyId, note) {
    try {
        const review = await Review.create({
            clientId: clientId,
            companyId: companyId,
            note: note
        });
        return review;
    } catch(err) {
        throw err;
    }
}


module.exports = Object.freeze({
    checkReview,
    publish
})