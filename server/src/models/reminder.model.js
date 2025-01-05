import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    testDate:{
        type:Date,
        required:true,
    },
    emailSent:{
        type:Boolean,
        default:false,
    }
});


const Reminder = mongoose.model("Reminder",reminderSchema);

export default Reminder;