const sequelize = require('../utils/connection');
const user = require('./createData/user');
const category = require('./createData/category');
require('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await user();//CREATE USER TO TEST.
        await category();//CREATE CATEGORY TO TEST.
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate()