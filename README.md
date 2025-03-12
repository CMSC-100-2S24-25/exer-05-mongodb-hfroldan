# Basic Student Management

## Author
**Name:** Hervé F. Roldan <br/>
**Degree Program:** B.S. Computer Science <br/>
**Student number:** 2021 - 08286 <br/>

## Code Description
The Student Mange is a simply Node.js + Express + MongoDB application, allowing user to manage student records. It supports adding, updating, deleting, and retrieving students.

To ensure system works correctly, automated test cases using `needle` are included.

## How to Use
### Installation & Setup
1. Clone the repo
```
git clone https://github.com/CMSC-100-2S24-25/exer-05-mongodb-hfroldan.git
cd exer-05-mongodb-hfroldan
```
2. Install dependencies
```
npm install
```
3. Start MongoDB. Ensure you have MongoDB running locally on port `27017`
```
mongodb://127.0.0.1:27017/StudentDatabase
```
4. Start the server
```
node .
```

The server will be available at `http://localhost:3000`

### Running Test Cases
It includes automated tests using `needle` to verify its functionality.

```
node test.js
```

This script will:
- Add students
- Prevent duplicate student entries
- Update existing students
- Prevent updates for non-existing students
- Delete a student and all students records
- Fetch a student and all students records

### Run a Specific Test Case
You can comment specific test cases inside `test.js` to run only certain tests.
```
// testSaveNewStudent();
// testUpdateExistingStudent();
```
Then run
```
node test.js
```


## References
- [Mongoose Docs](https://mongoosejs.com/docs/)
    - [Validation](https://mongoosejs.com/docs/validation.html)
    - [`findOneAndUpdate()`](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
    - [`deleteOne()`](https://mongoosejs.com/docs/5.x/docs/api/model.html#model_Model.deleteOne)
    - [`deleteMany()`](https://mongoosejs.com/docs/api/model.html#Model.deleteMany())
    - [`find()`]([https://mongoosejs.com/docs/api/model.html#Model.find()])
- [res.status()](https://www.geeksforgeeks.org/express-js-res-status-function/)