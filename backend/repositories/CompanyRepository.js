const db = require('../db');
const Company = require('../models/Company.js');

async function createCompany(company) {
    try {
        const createdCompany = await Company.create(company);
        return createdCompany;
    } catch(err) {
        throw err;
    }
}

async function findByCategory(category) {
    try {
        const companies = await Company.findAll({
            where: {
                category: category
            }
        });
        return companies
    } catch(err) {
        throw err;
    }
}

async function findByCategoryAndName(category, name) {
    try {
        const [companies, metadata] = await db.sequelize.query(`
            SELECT
                id,
                owner,
                name,
                cep,
                category,
                phone,
                whatsapp,
                email,
                site,
                instagram,
                facebook,
                desc,
                profile_picture_address
            FROM companies
            WHERE category = ${category}
            AND name like '%${name}%';
            `
        );
        return companies;
    } catch(err) {
        throw err;
    }
}

module.exports = Object.freeze({
    createCompany,
    findByCategory,
    findByCategoryAndName
});