const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog  = require('../models/Blog')

blogRouter.get('/', async (req, res, next) =>{
    try{
        console.log("Get request to /api/blogs")
        const blog = await Blog.find({})
        if(blog){
            res.json(blog)
        }else{
            res.send('blog not found')
        }
    }catch(error){
        next(error)
    }
})

blogRouter.post('/', async(req, res, next) =>{
    try{
        const body = req.body

        const newBlog = new Blog({
            
            title: body.title,
            author: body.author, 
            content: body.content,
            likeCount: body.likeCount,
            viewCount: body.viewCount
            
        })
        savedBlog = await newBlog.save()
        if (savedBlog) {
            res.json(savedBlog)
        }
    }catch(error){
        next(error)
    }
})

blogRouter.get('/:id', async(req, res, next) =>{
    // console.log("in id part")
    try{
        // console.log('in try block of id part')
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId)

        if (blog){
            res.json(blog);
        } else{
            res.status(404).send('Blog not found')
        }
    }catch(error) {
        next(error)
    }
})

blogRouter.delete('/:id', async(req, res, next) =>{
    try{
        const blogId = req.params.id

        const deletedBlog = await Blog.findByIdAndDelete(blogId)

        if (deletedBlog) {
            res.status(204).send()
        }else{
            res.status(404).send("Blog not found")
        }
    }catch(error){
        next(error)
    }
})
module.exports = blogRouter

