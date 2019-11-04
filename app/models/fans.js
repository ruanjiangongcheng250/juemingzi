const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Fans extends Model{

}

Fans.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    fans_id: {
        type: Sequelize.INTEGER,
        unique: true
    }
}, {sequelize, tableName: 'fans'})

module.exports = {
    Fans
}