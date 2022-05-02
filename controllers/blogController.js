const Blog = require('../models/blog');
const Upvote = require('../models/upvote');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.getBlogs = async(req, res) => {
    try {
        let blogs = await Blog.find({})

        console.log("blog****************", req.session.token);

        res.locals.token = req.session.token;
        res.locals.fullName = req.session.username;
        console.log(req.session.username, 'fullname');

        let resp = await Upvote.find().populate('post').exec();
        console.log(resp);

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
        let token = req.params.token;

        // console.log(token, 'blogcontroller*************')

        let filteredData = await Blog.findById(id)

        req.token = token;

        res.render('updateBlogForm', { blog: filteredData });
    } catch (err) {
        console.log(err);
    }
}

module.exports.createBlog = async(req, res) => {
    try {
        console.log(req.user, 'user************')
        let blog = await Blog.create({...req.body, author: req.user.id })
        console.log(blog);
        let upvote = new Upvote({
            post: blog._id
        })

        upvote.save();
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
module.exports.updateUpvote = async(req, res) => {
    try {
        let user = req.user.id;
        let postId = req.params.id;

        let post = await Upvote.findOne({ post: postId });
        let upvotes = [...post.upvotes];

        let alreadyExists = false;
        upvotes.find((ele) => {
            ele.author == user;
            alreadyExists = true;
        })
        if (alreadyExists)
            upvotes = upvotes.filter((ele) => ele.author != user);
        else
            upvotes.push({ author: user });

        await Upvote.findOneAndUpdate({ post: postId }, { upvotes: upvotes });

        console.log(upvotes, 'upvotes');

        res.json({
            count: upvotes.length
        })

    } catch (err) {
        console.log(err);
    }
}