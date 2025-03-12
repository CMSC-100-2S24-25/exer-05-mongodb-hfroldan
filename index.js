import express from 'express';
import router from './router.js';

const app = express();
app.use(express.urlencoded({extended: true})); // middleware to parse URL-encoded bodies
app.use(express.json()); // middleware to parse JSON

router(app); //use stated routes

// run server
app.listen(3000, () => console.log('Server running on port 3000'));