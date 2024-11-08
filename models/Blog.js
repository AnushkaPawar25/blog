const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 }, 
    author: { type: String, required: true, minlength: 2 }, 
    content: { type: String, required: true }, 
    likeCount: { type: Number, default: 0 },

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
    // viewCount: { type: Number, default: 0 },
}, { timestamps: true });

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);
