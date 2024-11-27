const mongoose = require("mongoose");

const mongooseURI = process.env.MONGO_URL;

const connectToMongo = () => {
    mongoose.connect(mongooseURI,()=> {
        console.log("Connected")
    })
}

mongoose.set('strictQuery', false);

module.exports = connectToMongo