const {
    LinValidator,
    Rule
} = require('../core/lin-validator-v2')
const {
    Article
} = require('../models/article')
const {
    ArticleType
} = require('../lib/enum')
const {
    Favor
} = require('../models/like')


class AddArticleValidator extends LinValidator {
    constructor() {
        super()
        this.title = [
            new Rule('isLength', '请输入文章题目', {
                min: 1
            })
        ]
        this.content = [
            new Rule('isLength', '文章内容不得少于100字', {
                min: 100
            })
        ]
    }
    validateArticleType(vals) {
        if (!vals.body.type) {
            throw new Error('type 是必传参数');
        }
        if (!ArticleType.isThisType(vals.body.type)) {
            throw new Error('type 参数不合法');
        }
    }
}

class DelArticleValidator extends LinValidator {
    constructor(ctx) {
        super()
        this.ctx = ctx
        this.article_id = [
            new Rule('isLength', '文章id不能为空', {
                min: 1
            })
        ]
    }
    async validateArticleId(vals) {
        const article = await Article.findOne({
            where: {
                id: vals.body.article_id
            }
        })
        if(!article){
            throw new Error('文章不存在')
        }
        if(this.ctx.auth.uid !== article.author_id){
            throw new Error('您没有权限删除此文章')
        }
    }
}
class UpdateArticleValidator extends LinValidator {
    constructor(ctx) {
        super()
        this.ctx = ctx
        this.title = [
            new Rule('isLength', '请输入文章题目', {
                min: 1
            })
        ]
        this.content = [
            new Rule('isLength', '文章内容不得少于200字', {
                min: 200
            })
        ]
    }
    validateArticleType(vals) {
        if (!vals.body.type) {
            throw new Error('type 是必传参数');
        }
        if (!ArticleType.isThisType(vals.body.type)) {
            throw new Error('type 参数不合法');
        }
    }
    async validateArticleId(vals) {
        const article = await Article.findOne({
            where: {
                id: vals.path.article_id
            }
        })
        if(!article){
            throw new Error('文章不存在')
        }
        if(this.ctx.auth.uid !== article.author_id){
            throw new Error('您没有权限删除此文章')
        }
    }
}

class QueryArticleByIdValidator extends LinValidator {
    constructor(ctx){
        super()
        this.ctx = ctx
        this.article_id = [
            new Rule('isInt', "文章id必须是整数"),
            new Rule('isLength', "文章id不能为空", {
                min: 1
            })
        ]
    }

    async validateArticleId(vals) {
        const article = await Article.findOne({
            where: {
                id: vals.query.article_id
            }
        })
        if(!article){
            throw new Error('文章不存在')
        }
        if(article.isPrivate){
            if(this.ctx.auth && this.ctx.auth.uid === article.author_id){ //作者本人是可以查看自己的私密文章的
                
            }else{
                throw new Error('此文章为私密文章, 您无权查看')
            }
        }
        return article
    }
}


class QueryAllArticleValidator extends LinValidator{
    constructor(){
        super()
        this.count = [
            new Rule('isInt', 'count必须是整数', {
                min: 1
            }),
            new Rule('isOptional')
        ]
        this.start = [
            new Rule('isInt', 'start必须是整数', {
                min: 0
            }),
            new Rule('isOptional')
        ]
    }
}

class QueryPrivate extends QueryAllArticleValidator {
    constructor(){
        super()
    }
}


class LikeValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule('isInt', '需要是整数', {
                min: 1
            })
        ]
    }
}

class CommentValidator extends LinValidator{
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是整数', {
                min: 1
            })
        ]
        this.content = [
            new Rule('isLength', '评论不能少于5个字', {
                min: 5
            })
        ]
    }
}


class getCommentValidator extends LinValidator{
    constructor(){
        super()
        this.id =  [
            new Rule('isInt', '需要是整数', {
                min: 1
            })
        ]
        this.count =  [
            new Rule('isInt', '需要是整数', {
                min: 1
            })
        ]
        this.start =  [
            new Rule('isInt', '需要是整数', {
                min: 0
            })
        ]
    }
}

class SearchValidator extends LinValidator {
    constructor(){
        super()
        this.keywords = [
            new Rule('isLength','搜索条件不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.start = [
            new Rule('isInt', 'start不合符规范', {
                min: 0,
                max: 60000
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', 'count不符合规范', {
                min: 1, 
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]
    }
}

module.exports = {
    AddArticleValidator,
    DelArticleValidator,
    UpdateArticleValidator,
    QueryArticleByIdValidator,
    QueryAllArticleValidator,
    LikeValidator,
    CommentValidator,
    getCommentValidator,
    QueryPrivate,
    SearchValidator
}