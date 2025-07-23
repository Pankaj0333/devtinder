const mongoose = require('mongoose');
const config = require('./index');
/**
 * 🔌 Connect to MongoDB using mongoose
 */
const connectDB = async ()=>{
    try{
        const conn  = await mongoose.connect(config.MONGO_URI);

    } catch(err){
        console.error(`Error: ${err.message}`);
        throw err;
    }
}

module.exports = {connectDB};