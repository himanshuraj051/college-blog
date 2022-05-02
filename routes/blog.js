const express = require('express');
const blogRouter = express.Router();

const {
    getBlogs,
    createBlogForm,
    createBlog,
    getBlog,
    updateBlogForm,
    updateBlog,
    updateUpvote
} = require('../controllers/blogController');
const { authenticateToken } = require('../controllers/userController');

blogRouter.get('/', getBlogs);
blogRouter.get('/new', createBlogForm);
blogRouter.get('/upvote/:id/:token', authenticateToken, updateUpvote);
blogRouter.get('/:id', getBlog);
blogRouter.get('/:id/edit/:token', authenticateToken, updateBlogForm);


blogRouter.post('/', authenticateToken, createBlog);
blogRouter.post('/:id', updateBlog);

module.exports = blogRouter;