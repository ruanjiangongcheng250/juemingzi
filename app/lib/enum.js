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


module.exports = {
    LoginType
}