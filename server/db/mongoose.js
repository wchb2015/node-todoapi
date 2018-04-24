var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_zc5f70mk:pfn0808084muqde7tr69dds568@ds127190.mlab.com:27190/heroku_zc5f70mk');

module.exports = { mongoose };


