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

// --------------------------------
// Controller Functions
// --------------------------------

// @desc    Add a new student
// @route   POST /save-student
// @access  Public
const saveStudent = async (req, res) => {
    try {
        const { stdnum } = req.body;
        const studentExists = await Student.findOne({ stdnum });

        if (studentExists) {
            return res.status(400).json({inserted: false, message: 'Student already exists. Cannot insert a new record.'});
        }

        const student = await new Student(req.body).save();
        return res.status(201).json({inserted: true, student});
    } catch (error) {
        return res.status(500).json({inserted: false});
    }
}

// @desc    Update a student
// @route   POST /update
// @access  Public
const updateStudent = async (req, res) => {
    try {
        const { fname, updatedfname, updatedlname } = req.body;
        const student = await Student.findOne({ fname });

        if (!student) {
            return res.status(404).json({updated: false, message: 'Student not found. Cannot update record.'})
        }

        const updatedStudent = await Student.findOneAndUpdate(
            {fname: fname}, 
            {fname: updatedfname, lname: updatedlname}, 
            {new: true}
        );

        return res.status(200).json({updated: true, updatedStudent});
    } catch (error) {
        return res.status(500).json({updated: false});
    }
}

// @desc    Delete a student
// @route   POST /remove-user
// @access  Public
const removeStudent = async (req, res) => {
    try {
        const { stdnum } = req.body;
        const student = await Student.findOne({stdnum});

        if (!student) {
            return res.status(404).json({updated: false, message: 'Student not found. Cannot delete record.'})
        }

        const deletedStudent = await Student.deleteOne({stdnum});
        return res.status(200).json({deleted: true, deletedStudent});
    } catch (error) {
        return res.status(500).json({deleted: false});
    }
}

// @desc    Delete all students
// @route   POST /remove-all-user
// @access  Public
const removeAllStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({});

        return res.status(200).json({deleted: true, result});
    } catch (error) {
        return res.status(500).json({deleted: false});
    }
}

// @desc    Find a student by their stdnum
// @route   GET /user
// @access  Public
const getStudent = async (req, res) => {
    const { stdnum } = req.query;
    if (!stdnum) { 
        return res.status(400).json({message: 'Student number is required', data: []}); 
    }

    try {
        const student = await Student.find({stdnum});
        return res.status(200).json(student || {message: 'Student not found.'});
    } catch (error) {
        res.status(500).json([]);
    }
}

// @desc    Find all students
// @route   GET /members
// @access  Public
const getAllStudents = async (req, res) => {
    try {
        return res.status(200).json(await Student.find({}));
    } catch (error) {
        res.status(500).json([]);
    }
}

export {
    saveStudent,
    updateStudent,
    removeStudent,
    removeAllStudents,
    getStudent,
    getAllStudents
}