const bcrypt = require('bcrypt')

const userRouter = require('express').Router()

const User = require('../models/User')

userRouter.get('/', async(req, res) =>{
    const users = await User.find({}).populate('blog', {title: 1, author: 1, content: 1, likeCount: 1} )
    res.json(users)
})


userRouter.post('/', async (req, res) =>{
    const {username, name, password} = req.body

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username, 
        name, 
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter