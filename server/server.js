require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
// all the middlewares we need. 

// for post requests
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("This is what you expected");
})

const port = process.env.PORT || 8080;

app.listen(port, console.log(`You are connected to the server at port ${port}`));