const { Admin, User, Course } = require('./index'); // adjust path if needed

// Insert sample data
async function testDB() {
    try {
        // Create Admin
        const admin = new Admin({ username: 'admin1', password: 'adminpass' });
        await admin.save();
        console.log('✅ Admin saved:', admin);

        // Create Course
        const course = new Course({
            title: 'Node.js Basics',
            description: 'Intro to Node',
            imageLink: 'http://image.com/node.png',
            price: 499,
            published: true
        });
        await course.save();
        console.log('✅ Course saved:', course);

        // Create User
        const user = new User({
            username: 'user1',
            password: 'userpass',
            purchasedCourses: [course._id]
        });
        await user.save();
        console.log('✅ User saved:', user);

        // Fetch user with populated course
        const result = await User.findOne({ username: 'user1' }).populate('purchasedCourses');
        console.log('✅ User with populated courses:', result);
        
    } catch (err) {
        console.error('❌ Error during test:', err);
    }
}

testDB();
