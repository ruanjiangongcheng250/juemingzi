const { sequelize } = require('../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { Fans } = require('./fans')
const { Article } = require('./article')

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
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        });
        return user;
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }

    static async getUserById(id){
        let wordNumber = 0
        const exclude = ['password', 'openid', 'phone', 'email']
        const articles = await Article.findAll({
            where: {
                author_id: id
            }
        })
        articles.forEach(item=>{
            wordNumber += item.nums
        })
        const userFans = await User.getUserList(id, 'fans')
        const userFollows = await User.getUserList(id, 'follow')
        const userArticles = await Article.getArticlesByAuthorId(id)
        const user = await User.findOne({
            where: {
                id
            },
            attributes: { exclude }            
        })
        user.setDataValue('fans', userFans)
        user.setDataValue('follows', userFollows)
        user.setDataValue('articles', userArticles)
        user.setDataValue('wordNumber', wordNumber)
        return user
    }

    static async getUserList(id, type, start=0, count=10){
        start = start || 0
        count = count || 10
        let ids
        let fansIds = []
        let followIds = []
        const fans = await Fans.findAll({ //用户的粉丝 所以在粉丝表中  对用的字段是user_id
            where: {
                user_id: id
            }
        })
        const follows = await Fans.findAll({ //用户的关注  此时用户是粉丝 
            where: {
                fans_id: id
            }
        })
        fans.forEach(item=>{
            fansIds.push(item.fans_id)
        })
        follows.forEach(item=>{
            followIds.push(item.user_id)
        })
        if(type === 'fans'){
            ids = fansIds
        }else if(type === 'follow'){
            ids = followIds
        }
        const result = await User.findAndCountAll({
            where: {
                id: {
                    [Op.in]: ids
                },
            },
            limit: count,
            offset: start,
            attributes: { exclude: ['password', 'openid', 'phone', 'email'] }
        })
        return result;
    }


    static async getRecommandWriterList() { //根据作者的level 筛选出推荐作者
        const result = await User.findAll({
            limit: 10,
            // order: ["level"] 
            attributes: {exclude: ["password", "phone", "email", "openid"]}
        })
        return result
    }

    static async search(keyword, start, count) {
        const result = await User.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${keyword}%`
                }
            },
            limit: count,
            offset: start,
            attributes: {exclude: ["password", "phone", "email", "openid"]}
        })
        return result
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(64),
        unique: true
    },
    password: {
        type: Sequelize.STRING(64),
        set(val){
            const salt = bcrypt.genSaltSync(10) //生成盐  数值越大  成本越高 时间越长
            const pwd = bcrypt.hashSync(val, salt)  // 相同密码生成的值是不一样的  防止彩虹攻击
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
    phone: {
        type: Sequelize.STRING(11),
        unique: true
    },
    email: {
        type: Sequelize.STRING(64),
        unique: true
    },
    avator: {
        type: Sequelize.STRING(64)
    },
    desc: {
        type: Sequelize.STRING(64)
    },
    site: {
        type: Sequelize.STRING(64)
    },
    wechat: {
        type: Sequelize.STRING(64)
    }
}, {sequelize, tableName: 'user'})

module.exports = {
    User
}