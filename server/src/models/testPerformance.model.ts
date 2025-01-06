import mongoose from "mongoose";


const testPerformance = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    testId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Test",
        required:true
    },
    score:{
        type:Number,
        required:true,
        default:0
    },
    date:{
        type:Date,
        default:Date.now(),
    },
})


const TestPerformance = mongoose.model("TestPerformance",testPerformance);

export default TestPerformance;