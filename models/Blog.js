const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String, 
    likeCount: {type: Number, default: 0}, 
    viewCount: {type: Number, default: 0},
}, {timestamps : true})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog',blogSchema )