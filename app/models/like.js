const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')

class Like extends Model {
    static async userLikeIt(art_id, uid) {
        const like = await Like.findOne({
            where: {
                art_id,
                user_id: uid
            }
        })
        return like ? true : false
    }

    static async like(art_id, user_id) {
        const like = await Like.findOne({
            where: {
                art_id,
                user_id
            }
        })
        if(like){
            throw new global.errs.LikeError();
        }
        await Like.create({
            art_id,
            user_id
        })
    }
    static async unlike(art_id, user_id) {
        const like = await Like.findOne({
            where: {
                art_id,
                user_id
            }
        })
        if(!like){
            throw new global.errs.DislikeError();
        }
        like.destroy({
            force: true
        })
    }
}

Like.init({
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
    }
}, {
    sequelize,
    tableName: 'like'
})

module.exports = {
    Like
}