const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error("caonnection to mongodb failed", err);
        process.exit(1);
    }
}

module.exports = db;