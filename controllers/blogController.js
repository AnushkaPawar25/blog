const blogRouter = require('express').Router()
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


module.exports = blogRouter

