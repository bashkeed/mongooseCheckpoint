import mongoose from "mongoose";

const Person = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number 
    },favoriteFoods:{
        type: [String]
    }

})

const User = mongoose.model('User', Person)
export default User