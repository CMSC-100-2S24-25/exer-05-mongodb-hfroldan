import needle from 'needle';

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

//
// Sample inputs
//
const newStudentArray = [
    { stdnum: "123456", fname: "John", lname: "Doe", age: 21 },
    { stdnum: "789012", fname: "Jane", lname: "Smith", age: 22 },
    { stdnum: "345678", fname: "Alice", lname: "Johnson", age: 20 },
    { stdnum: "901234", fname: "Bob", lname: "Brown", age: 23 },
    { stdnum: "567890", fname: "Mary Jane", lname: "Watson", age: 21 }
];

const existingStudent = { stdnum: "567890", fname: "Mary Jane", lname: "Watson", age: 21 };
const updateExistingStudent = { fname: "Mary Jane",  updatedfname: "MJ",  updatedlname: "Parker" };
const updateNonExistingStudent = { fname: "Melody",  updatedfname: "MJ",  updatedlname: "Parker" };
const deleteExistingStudent = { stdnum: "123456" }
const deleteNonExistingStudent = { stdnum: "8051495846" }
const findSpecificStdNum = "345678";

let passedTests = 0;
let failedTests = 0;

//
// Helper function to log test results
//
const logTestResult = (testName, condition, expected, actual) => {
    if (condition) {
        passedTests++;
        console.log(`${testName}: PASSED`);
    } else {
        failedTests++;
        console.log(`${testName}: FAILED | (Expected: ${expected}, Got: ${actual})`);
    }
}

const testSaveNewStudent = async () => {
    for (const student of newStudentArray) {
        try {
            const res = await needle('post', `${URL}/save-student`, student, { json: true });
            logTestResult(
                `Save new student ${student.fname} ${student.lname}`,
                res.body.inserted === true,
                true,
                res.body.inserted
            );
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
};

const testSaveExistingStudent = async () => {
    try {
        const res = await needle('post', `${URL}/save-student`, existingStudent, { json: true });

        logTestResult(
            `Save an already existing student ${existingStudent.fname} ${existingStudent.lname}`,
            res.body.inserted === false,
            false,
            res.body.inserted
        );
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testUpdateExistingStudent = async () => {
    try {
        const res = await needle('post', `${URL}/update`, updateExistingStudent, {json: true});

        logTestResult(
            `Update student ${updateExistingStudent.fname} info`,
            res.body.updated === true,
            true,
            res.body.updated
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testUpdateNonExistingStudent = async () => {
    try {
        const res = await needle('post', `${URL}/update`, updateNonExistingStudent, {json: true});

        logTestResult(
            `Update a non-existing student ${updateNonExistingStudent.fname} info`,
            res.body.updated === false,
            false,
            res.body.updated
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testDeleteExistingStudent = async () => {
    try {
        const res = await needle('post', `${URL}/remove-user`, deleteExistingStudent, {json: true});

        logTestResult(
            `Delete student ${deleteExistingStudent.stdnum} record`,
            res.body.deleted === true,
            true,
            res.body.deleted
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testDeleteNonExistingStudent = async () => {
    try {
        const res = await needle('post', `${URL}/remove-user`, deleteNonExistingStudent, {json: true});

        logTestResult(
            `Delete non-existing student ${deleteNonExistingStudent.stdnum} record`,
            res.body.deleted === false,
            false,
            res.body.deleted
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testDeleteAllStudents = async () => {
    try {
        const res = await needle('post', `${URL}/remove-all-user`, { json: true });

        logTestResult(
            `Deleted all ${res.body.result.deletedCount} students`,
            res.body.deleted === true,
            true,
            res.body.deleted
        );
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testfindStudent = async () => {
    try {
        const res = await needle('get', `${URL}/user?stdnum=${findSpecificStdNum}`);

        logTestResult(
            `Find student ${findSpecificStdNum}`,
            res.body.length > 0,
            true,
            res.body.length > 0
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const testfindAllStudents = async () => {
    try {
        const res = await needle('get', `${URL}/members`);

        logTestResult(
            `Find all ${res.body.length} students`,
            Array.isArray(res.body),
            true,
            Array.isArray(res.body)
        )
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

//
// Run all tests sequentially
//
const runTests = async () => {
    console.log("\nRunning test cases ...\n");

    await testSaveNewStudent();
    await testSaveExistingStudent();
    await testUpdateExistingStudent();
    await testUpdateNonExistingStudent();
    await testDeleteExistingStudent();
    await testDeleteNonExistingStudent();
    await testfindStudent();
    await testfindAllStudents();
    await testDeleteAllStudents();

    console.log("\nTotal tests passed:", passedTests);
    console.log("Total tests failed:", failedTests);
    console.log(`Test result: ${passedTests} / ${passedTests + failedTests} passed\n`);
}

//
// Run all tests
//
runTests();