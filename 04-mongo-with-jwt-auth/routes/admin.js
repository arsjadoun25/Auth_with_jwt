const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, User, Course} = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    // Check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);
    const user = await User.findOne({
        username,
        password
    });
    if(user){
        const token = jwt.sign({ usernmae}, JWT_SECRET);
        res.json({
            token
        });
    }else{
        res.status(411).json({
            massage: "Incorrect email and password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod validation can be added here
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        massage: 'Course created successfully',
        courseId: newCourse._Id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        massage: 'Courses fetched successfully',
        courses: courses
    })
});

module.exports = router;