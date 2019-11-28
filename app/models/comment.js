const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')

class Comment extends Model {
    static async add(art_id, content, user_id) {
        await Comment.create({
            art_id,
            content,
            user_id
        })
    }

    static async query(art_id, offset, count) {
        const result = await Comment.findAndCountAll({
            where: {
                art_id
            },
            count,
            offset
        })
        return result
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
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = {
    Comment
}