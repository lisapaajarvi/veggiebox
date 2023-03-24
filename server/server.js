const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const cookieSession = require('cookie-session');
const dotenv = require("dotenv");
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');

dotenv.config();
app.use(cors())
app.use(express.json())

app.use(cookieSession({
    name: 'session',
    secret: 'guineaPigsAreAwesome',
    secure: false,
    maxAge: 1000 * 600,
    httpOnly: true
}));

app.use(userRouter, productRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err.message)
});

console.log()
async function run() {
    try { 
        await mongoose.connect((process.env.MONGODB_URI), {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        console.log('Guinea Pig Database is connected and ready to floof!');
    } catch (error) {
        console.error(error)
    }
}

app.listen(4000, ()=> (
    console.log('Server is up and running')
));

run();
