import mongoose, { mongo } from "mongoose"

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    city:String,
    state:String,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    reminders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reminder"
    }],
    testPerformance:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"TestPerformance"
        }]
})

const User = mongoose.model("User",user);

export default User;