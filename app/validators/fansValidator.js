const {
    LinValidator,
    Rule
} = require('../core/lin-validator-v2')
const {
    Fans
} = require('../models/fans')
class FansValidator extends LinValidator{
    constructor(ctx){
        super()
        this.uid = ctx.auth.uid
        this.id = [
            new Rule('isInt', '用户的id必须是整数')
        ]
    }

    async validateFans(vals) {
        const author_id = vals.body.author_id
        const result = await Fans.findOne({
            where: {
                user_id: author_id,
                fans_id: this.uid
            }
        })
        if(result){
            throw new global.errs.AddFansError();
        }
    }

}


class RemoveFansValidator extends LinValidator{
    constructor(ctx){
        super()
        this.uid = ctx.auth.uid
        this.id = [
            new Rule('isInt', '用户的id必须是整数')
        ]
    }

    async validateFans(vals) {
        const author_id = vals.body.author_id
        const result = await Fans.findOne({
            where: {
                user_id: author_id,
                fans_id: this.uid
            }
        })
        if(!result){
            throw new global.errs.RemoveFansError();
        }
    }

}

module.exports = {
    FansValidator,
    RemoveFansValidator
}