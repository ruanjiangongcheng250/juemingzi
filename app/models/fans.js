const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Fans extends Model{
    static async add(user_id, fans_id){ //fans_id是user_id的一个粉丝
        await Fans.create({
            user_id,
            fans_id
        })
    }
    static async remove(user_id, fans_id){ //fans_id是user_id的一个粉丝
        const result = await Fans.findOne({
            user_id,
            fans_id
        })
        result.destroy({
            force: true
        })
    }
}

Fans.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    fans_id: {
        type: Sequelize.INTEGER
    }
}, {sequelize, tableName: 'fans'})

module.exports = {
    Fans
}