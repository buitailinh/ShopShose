const { string } = require('mathjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LoaiSP = new Schema({
    TenLoai: { type: String },
    MaLoai: { type: String }
})
module.exports = mongoose.model('LoaiSP', LoaiSP, 'tLoaiSP')