const { Schema, model } = require('mongoose');

module.exports = model('welcomer', new Schema({
    Guild: String,
    Channel: String,
   })
);