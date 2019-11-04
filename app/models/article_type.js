const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class ArticleType extends Model{

}

ArticleType.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    type: {
        type: Sequelize.STRING,
        unique: true
    }
}, {sequelize, tableName: 'article_type'})

module.exports = {
    ArticleType
}