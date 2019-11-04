const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Like extends Model{

}

Like.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    article_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER,
    }
}, {sequelize, tableName: 'like'})

module.exports = {
    Like
}