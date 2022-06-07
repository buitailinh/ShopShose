const mongoose = require('mongoose')


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ShopShoes', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,

        })
        console.log('Connect successfuly!!!')
    } catch (error) {
        console.log('Connect failure???')
    }
}

module.exports = { connect }