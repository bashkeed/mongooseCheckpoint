import mongoose from "mongoose";

const connectDB = ()=>{
    const uri = process.env.MONGO_URI
    mongoose.connect(uri, {
        dbname: 'mongoose'
    }, {useNewUrParser:true},{useUnifiedTopology:true})
    .then(()=> console.log("MongoDB Connected..."))
    .catch(error => console.log('database connection failed!',error));

}

export default connectDB