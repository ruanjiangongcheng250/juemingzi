const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Comment extends Model{

}

Comment.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    article_id: {
        type: Sequelize.INTEGET
    },
    user_id: {
        type: Sequelize.INTEGET,
    },
    content: {
        type: Sequelize.STRING
    }
}, {sequelize, tableName: 'comment'})

module.exports = {
    Comment
}