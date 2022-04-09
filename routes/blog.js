const express = require('express');
const blogRouter = express.Router();

const {
    getBlogs,
    createBlogForm,
    createBlog,
    getBlog,
    updateBlogForm,
    updateBlog
} = require('../controllers/blogController');

blogRouter.get('/', getBlogs);
blogRouter.get('/new', createBlogForm);
blogRouter.get('/:id', getBlog);
blogRouter.get('/:id/edit', updateBlogForm);

blogRouter.post('/', createBlog);
blogRouter.post('/:id', updateBlog);

module.exports = blogRouter;