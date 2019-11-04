const { sequelize } = require('../core/db')
const { Sequelize, Model} = require('sequelize')

class Album extends Model{

}

Album.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    image_url: {
        type: Sequelize.STRING
    },
    image_desc: {
        type: Sequelize.STRING
    }
}, {sequelize, tableName: 'album'})

module.exports = {
    Album
}