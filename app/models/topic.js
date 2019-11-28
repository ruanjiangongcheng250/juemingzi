const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Topic extends Model{
    static async getTopicList(){
        const result = await Topic.findAll()
        return result
    }
}

Topic.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
}, {sequelize, tableName: 'topic'})

module.exports = {
    Topic
}