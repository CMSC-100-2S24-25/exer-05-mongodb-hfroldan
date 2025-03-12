import mongoose from 'mongoose';

// --------------------------------
// Database Connection 
// --------------------------------

const MONGO_URI = 'mongodb://127.0.0.1:27017/StudentDatabase';

await mongoose.connect(MONGO_URI)
.then(() => console.log('Connection to MongoDB was established successfully'))
.catch((error) => console.error('Error connecting to MongoDB: ', error));

// --------------------------------
// Database Schema and Model
// --------------------------------

const studentSchema = new mongoose.Schema({
    stdnum: {
        type: String,
        required: [true, 'Student number is required'],
        unique: true
    },
    fname: {
        type: String,
        required: [true, 'First name is required']
    },
    lname: {
        type: String,
        required: [true, 'Last name is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: 1
    }
})

const Student = mongoose.model('Student', studentSchema);