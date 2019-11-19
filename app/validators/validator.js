const {
    LinValidator,
    Rule
} = require('../core/lin-validator-v2')
const {
    User
} = require('../models/user');
const {
    LoginType,
} = require('../lib/enum');

class PostiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是整数', {
                min: 1
            })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '请输入正确格式的邮箱')
        ]
        this.name = [
            new Rule('isLength', '密码不符合长度规范', {
                min: 4,
                max: 32
            })
        ]
        this.phone = [
            new Rule('matches', "请输入正确的手机号", '^1[0-9]{10}')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6位， 最多32位', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
    }
    validatePassword(vals) {
        const psd1 = vals.body.password1;
        const psd2 = vals.body.password2;
        if (psd1 !== psd2) {
            throw new Error('两个密码必须相同')
        }

    }

    async validateAccount(vals) {
        const email = vals.body.email
        const phone = vals.body.phone
        const name = vals.body.name
        let user;
        user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error('email已经存在');
        }
        user = await User.findOne({
            where: {
                phone
            }
        })
        if (user) {
            throw new Error('phone已经存在');
        }
        user = await User.findOne({
            where: {
                name
            }
        })
        if (user) {
            throw new Error('name已经存在');
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super();
        this.account = [
                new Rule('isLength', '不符合账号规则', {
                    min: 4,
                    max: 32
                })
            ],
            // 1.可以为空  可以不传
            // 2.传就要有一定的规则
            // web  账号+密码
            // 小程序 公众号  账号 依赖于微信的账号密码  已经合法
            this.secret = [
                new Rule('isOptional'),
                new Rule('isLength', '至少6个字符', {
                    min: 6,
                    max: 128
                })
            ]
        //   this.type = [

        //   ]
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type 是必传参数');
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type 参数不合法');
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor(){
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

class SearchValidator extends LinValidator {
    constructor(){
        super()
        this.q = [
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

class AddShortCommentValidator extends PostiveIntegerValidator {
    constructor(){
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}



module.exports = {
    PostiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    SearchValidator,
    AddShortCommentValidator
}