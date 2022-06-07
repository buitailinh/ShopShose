const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chatlieu = new Schema({
    ChatLieu: { type: String }

})

module.exports = mongoose.model('chatlieu', chatlieu, 'tChatLieu')