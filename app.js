const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");
const req = require('express/lib/request');
const { render } = require('express/lib/response');

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/blog').then(() => {
    console.log("connected to database!");
})

let blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: { type: Date, default: Date.now }
})

let Blog = mongoose.model('Blog', blogSchema);

//home
app.get('/', (req, res) => {
    res.send("<h1>Home</h1>");
});

//blog-list
app.get('/blog', async(req, res) => {
    try {
        let blogs = await Blog.find({})
        res.render('index', { blog: blogs });
    } catch {

    }
});

//new-blog-form
app.get('/blog/new', (req, res) => {
    res.render('createBlogForm')
});

//add-new-blog
app.post('/blog', async(req, res) => {
    try {
        await Blog.create(req.body)
        res.redirect('/blog');
    } catch {
        res.redirect('/blog');
    }
});

//view single-blog
app.get('/blog/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let filteredData = await Blog.findById(id)

        res.render('Blog', { blog: filteredData });
        res.status(200).send();
    } catch {
        res.redirect('/blog');
    }
})

//update blog form
app.get('/blog/:id/edit', async(req, res) => {
    let id = req.params.id;
    let filteredData = await Blog.findById(id)
    res.render('updateBlogForm', { blog: filteredData });
})

//update post 
app.post('/blog/:id', async(req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body, 'req.body.....')
        await Blog.findByIdAndUpdate(id, { body: req.body.body });
        res.redirect(`/blog/${id}`)
    } catch {
        console.log("error")
    }
})

app.listen(3001, () => {
    console.log("listening on port 3001")
})