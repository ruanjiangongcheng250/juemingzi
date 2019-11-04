module.exports = {
  apps : [{
    name: 'juemingzi',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: { // pm2 start ecosystem.config.js  默认启动的是开发
      NODE_ENV: 'development'
    },
    env_production: { // pm2 start ecosystem.config.js  --env production  这样启动的是线上版本
      NODE_ENV: 'production'
    }
  }]
};
