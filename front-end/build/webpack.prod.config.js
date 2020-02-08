const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = (env) => merge(baseConfig(env), {

});