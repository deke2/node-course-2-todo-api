var env = process.env.NODE_ENV || 'development';  // This is only set by Heroku (or configured in package.JSON)
console.log('env *****', env);

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
      process.env[key] = envConfig[key];
    });
}