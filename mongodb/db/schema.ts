import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    job_title:String,


})


const userModel = mongoose.model('user',userSchema)

export default userModel