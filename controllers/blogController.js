const Blog = require('../models/blog');

module.exports.getBlogs = async(req, res) => {
    try {
        let blogs = await Blog.find({})
        res.render('index', { blog: blogs });
    } catch {

    }
}

module.exports.getBlog = async(req, res) => {
    try {
        let id = req.params.id;
        let filteredData = await Blog.findById(id)

        res.render('Blog', { blog: filteredData });
    } catch {
        res.redirect('/blog');
    }
}

module.exports.createBlogForm = (req, res) => {
    res.render('createBlogForm')
}

module.exports.updateBlogForm = async(req, res) => {
    try {
        let id = req.params.id;
        let filteredData = await Blog.findById(id)
        res.render('updateBlogForm', { blog: filteredData });
    } catch (err) {
        console.log(err);
    }
}

module.exports.createBlog = async(req, res) => {
    try {
        await Blog.create(req.body)
        res.redirect('/blog');
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateBlog = async(req, res) => {
    try {
        const id = req.params.id;
        await Blog.findByIdAndUpdate(id, req.body);
        res.redirect(`/blog/${id}`)
    } catch {
        console.log("error")
    }
}