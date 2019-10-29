const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model{

}

Model.init({
    age: Sequelize.INTEGER
}, {sequelize, tableName: 'user'})

module.exports = {
    User
}