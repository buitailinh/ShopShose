const { string } = require('mathjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mau = new Schema({
    TenMau: { type: String },
})
module.exports = mongoose.model('Mau', Mau, 'tMau')