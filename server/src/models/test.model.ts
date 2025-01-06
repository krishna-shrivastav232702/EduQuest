import mongoose from "mongoose";


const testSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    generatedQuestions: [
        {
            questionText: {
                type: String,
                required: true
            },
            options: [{
                type: String,
                required: true,
            }],
            correctAnswer:{
                type:String,
                required:true,
            },
            userAnswer:{
                type:String,
                default:null,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
})

const Test = mongoose.model("Test",testSchema);

export default Test;