function isThisType(val){
    for(let key in this){
        if(this[key] == val){
            return true;
        }
    }
    return false;
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_NAME: 102,
    USER_PHONE: 103,
    ADMIN: 200,
    isThisType
}

const ArticleType = {
    IT: 100,
    NOTE: 101,
    OTHER: 102,
    isThisType
}


module.exports = {
    LoginType,
    ArticleType
}