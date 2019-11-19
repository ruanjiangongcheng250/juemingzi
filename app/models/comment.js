const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Comment extends Model{
    static async add(art_id, user_id, content){
        await Comment.create({
            art_id,
            user_id, 
            content
        })
    }
}

Comment.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    art_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    content: {
        type: Sequelize.STRING
    }
}, {sequelize, tableName: 'comment'})

module.exports = {
    Comment
}