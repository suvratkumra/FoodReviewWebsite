require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const listRouter = require('./routes/List/List');
const connect = require('./utils/dbConnect');
const jwt = require('jsonwebtoken')

const MongoStore = require('connect-mongo');
const userRouter = require('./routes/User/User');
const profileRouter = require('./routes/Profile/Profile');

const session = require('express-session');
const feedbackRouter = require('./routes/Feedback/Feedback');


// start the db
connect();

// all the middlewares we need. 


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/v1/user", userRouter);
app.use("/v1/list", listRouter);
app.use("/v1/profile", profileRouter);
app.use("/v1/feedback", feedbackRouter);


const port = process.env.PORT || 8080;

app.listen(port, console.log(`You are connected to the server at port ${port}`));