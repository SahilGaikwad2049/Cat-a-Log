const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sahilpankajgaikwadphe23:uzCBL4AasAAGM4Jl@cluster0.haxng.mongodb.net/')

const courseSchema = new mongoose.Schema({
    course: String,
    present: {
        type: Number,
        default: 0
    },
    absent: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    }
})

const courses = mongoose.model('courses', courseSchema)

module.exports = { courses }