const { sequelize } = require('../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model{
    static async verifyAccountPassword(account, plainPassword){
        const user = await User.findOne({
            where: {
                [Op.or]: [{email: account}, {phone: account}, {name: account}]
            }
        });
        if(!user){
            throw new global.errs.AuthFailed('账号不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user;

    }
}

Model.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10) //生成盐  数值越大  成本越高 时间越长
            const pwd = bcrypt.hashSync(val, salt)  // 相同密码生成的值是不一样的  防止彩虹攻击
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(128),
        unique: true
    },
    phone: {
        type: Sequelize.STRING(11),
        unique: true
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    }
}, {sequelize, tableName: 'user'})

module.exports = {
    User
}