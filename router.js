import {
    saveStudent,
    updateStudent,
    removeStudent,
    removeAllStudents,
    getStudent,
    getAllStudents
} from './controller.js';

const router = (app) => {
    app.post('/save-student', saveStudent);
    app.post('/update', updateStudent);
    app.post('/remove-user', removeStudent);
    app.post('/remove-all-user', removeAllStudents);
    app.get('/user', getStudent);
    app.get('/members', getAllStudents);
}

export default router