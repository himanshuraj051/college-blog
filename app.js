const express = require('express');
const dummy = require('./dummyData').data;
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");
const req = require('express/lib/request');
const { render } = require('express/lib/response');

const app = express();

app.use(express.json());
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
    let filteredData = data.filter((blog) => blog.id === id);
    // console.log(filteredData);
    res.render('Blog', { blog: filteredData[0] });
    res.status(200).send();
})

//update blog form
app.get('/blog/:id/edit', (req, res) => {
    let id = req.params.id;
    let filteredData = data.filter((blog) => blog.id === id);
    res.render('updateBlogForm', { blog: filteredData[0] });
})

//update post 
app.post('/blog/:id', (req, res) => {
    let { title, body } = req.body;
    const id = req.params.id;
    data.map(blog => {
        if (blog.id === id) {
            blog.title = title;
            blog.body = body;

            return;
        }
    })

    res.redirect(`/blog/${id}`)
})

let arr = [1, 2, 3, 4, 5, 6];
arr.map((value, index) => {
    console.log(value, index);
})

let newArr = arr.filter((value, index) => {
    if (value > 3) {
        return false;
    } else {
        return true;
    }
})

console.log(newArr);

app.listen(3001, () => {
    console.log("listening on port 3001")
})