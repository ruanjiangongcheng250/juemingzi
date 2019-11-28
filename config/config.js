module.exports = {
    database: {
        dbName: 'juemingzi-dev',
        host: '154.8.159.45',
        port: 3306,
        user: 'root',
        password: 'zhangtao'
    },
    security: {
        secretKey: 'abcdef',
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        appId: 'wxbbfb5fec0b2a7b19',
        appSecret: '5feb4ad105261e9615905ee59a4cee36',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}