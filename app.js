const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/blog', blogRouter);
app.use('/user', userRouter);

mongoose.connect('mongodb://localhost:27017/blog').then(() => {
    console.log("connected to database!");
})

//home
app.get('/', (req, res) => {
    res.send("<h1>Home</h1>");
});

app.listen(3001, () => {
    console.log("listening on port 3001")
})