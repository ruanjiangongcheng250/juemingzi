const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const { Like } = require('./like')

class Article extends Model {
    static async add(v, ctx) {
        await Article.create({
            title: v.get('body.title'),
            content: v.get('body.content'),
            description: v.get('body.content').substr(0, 200),
            author_id: ctx.auth.uid,
            nums: v.get('body.content').length,
            image: v.get('body.image')
        })
    }
    static async delete(id){
        await Article.destroy({
            where: {
                id
            }
        })
    }
    static async update(v, ctx){
        const content = v.get('body.content')
        await Article.update({
            title: v.get('body.title'),
            content,
            description: content.substr(0, 200),
            author_id: ctx.auth.uid,
            nums: content.length,
            image: v.get('body.image')
        }, {
            where: {
                id: v.get('path.article_id')
            }
        })
    }
    static async getAll() {
        const articles = await Article.findAll({
            where: {
                isPrivate: false
            }
        })
        const ids = []
        articles.forEach(item=>{
            ids.push(item.id)
        })
        const likes = await Like.findAll({
            where: {
                art_id:{
                    [Op.in]:ids,
                }
            },
            group:['art_id'],
            attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']]
        })
        articles.forEach(article=>{
            Article._getEachArticleStatus(article, likes)
        })
        return articles
    }

    static _getEachArticleStatus(article, likes) {
        let count = 0
        likes.forEach(like=>{
            if(like.art_id === article.id){
                count = like.get('count')
            }
        })
        article.setDataValue('fav_nums', count)
    }

    static async queryArticleByid(v, uid){
        const art_id = v.get('query.article_id')
        const result = await Article.findOne({
            where: {
                isPrivate: false,
                id: art_id
            }
        })
        const like_status = await Like.userLikeIt(art_id, uid)
        result.setDataValue('like_status', like_status)
        return result
    }
    
}

Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    nums: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: 'article'
})

module.exports = {
    Article
}