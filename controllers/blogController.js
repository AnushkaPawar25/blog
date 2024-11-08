const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog  = require('../models/Blog')
const User = require('../models/User')

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
        
        const user = await User.findById(body.userId)

        if(!user){
            return res.status(404).json({error: "user not found"})
        }

        const newBlog = new Blog({
            
            title: body.title,
            author: body.author, 
            content: body.content,
            likeCount: body.likeCount,
            user: user.id
            // viewCount: body.viewCount
            
        })
        savedBlog = await newBlog.save()

        user.blog.push(savedBlog.id);

        await user.save()
        
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

// blogRouter.post('/:id/like', async(req, res, next) =>[
//     try{
//         const blogId = req.params.id
//         const userId = req.user._id
//     }
// ])

blogRouter.put('/:id', async(req, res, next) =>{
    try{
        const {id} = req.params
        const {title, content, likeCount} = req.body

        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title, 
            content, 
            likeCount
        }, 
        {new: true}
        )

        if (!updatedBlog) {
            return res.status(404).json({error: "Blog post not found"})
        }

        res.json(updatedBlog)
    } catch(error) {
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

