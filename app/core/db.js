const { Sequelize, Model } = require('sequelize')
const { dbName, host, user, password, port } = require('../../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        charset:'utf8mb4',
        timestamps: true,
        paranoid: true,
    }
}) 
sequelize.sync({
    force:false
})

module.exports = {
    sequelize
}