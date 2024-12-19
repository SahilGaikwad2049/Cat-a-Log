const express = require('express')
const cors = require('cors')
const { courses } = require('./db')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/courses', async function(req,res) {
    const sub = req.body
    const course = await courses.create({
        course: sub.course,
        present: 0,
        absent: 0,
        percentage: 0   
    })

    res.json({ course });
})

app.get('/attendance', async function(req,res) {
    try{
        const allCourses = await courses.find({})
        res.json(allCourses)
    }
    catch(err) {
        res.status(500).json({
            msg: err.msg
        })
    }
    
})

app.post("/attendance/:courseId/countPresent", async function(req, res) {
    const courseId = req.params.courseId;
    const course = await courses.findById(courseId);

    if(!course) {
        return res.status(404).json({
            msg: "Course not found!",
        })
    }

    course.present = course.present + 1
    course.percentage = Math.round(((course.present) / (course.present + course.absent) * 100));

    await course.save()

    res.json({
        msg: 'Present', course
    })
        
}) 

app.post("/attendance/:courseId/countAbsent", async function(req, res) {
    const courseId = req.params.courseId;
    const course = await courses.findById(courseId);

    if(!course) {
        return res.status(404).json({
            msg: "Course not found!",
        })
    }

    course.absent = course.absent + 1;
    course.percentage = Math.round(((course.present) / (course.present + course.absent) * 100));

    await course.save()

    res.json({
        msg: 'Absent', course
    })
        
}) 

app.delete("/courses/:courseId", async (req, res) => {
    try{
        const courseId = req.params.courseId;
        const deletedCourse = await courses.findByIdAndDelete(courseId);

        if(!deletedCourse) {
            return res.status(404).json({msg: "Course not found!"});
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

app.listen(3000, ()=> {
    console.log('http://localhost:3000')
})