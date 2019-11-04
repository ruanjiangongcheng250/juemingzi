const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Article extends Model{

}

Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    description: {
        type:Sequelize.STRING
    },
    nums: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    }
}, {sequelize, tableName: 'article'})

module.exports = {
    Article
}