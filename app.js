const express = require('express');
const dummy = require('./dummyData').data;
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");
const req = require('express/lib/request');

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connect('mongodb://localhost:27017/blog').then(() => {
//     console.log("connect to database!");
// })

let data = dummy;

//home
app.get('/', (req, res) => {
    res.send("<h1>Home</h1>");
});

//blog-list
app.get('/blog', (req, res) => {
    console.log(data);
    res.render('index', { blog: data });
});

//new-blog-form
app.get('/blog/new', (req, res) => {
    res.render('createBlogForm')
});

//add-new-blog
app.post('/blog', (req, res) => {
    console.log(req.body);
    data.push({ title: req.body.title, body: req.body.body });
    res.redirect('/blog');
});

//view single-blog
app.get('/blog/:id', (req, res) => {
    let id = req.params.id;
    console.log("reached here!!", id);
    res.render('Blog')
})

app.listen(3001, () => {
    console.log("listening on port 3001")
})