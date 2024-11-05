require('dotenv').config()
const express = require('express')

const { default: mongoose } = require('mongoose')
const blogRouter= require('./controllers/blogController');
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')

const app = express()
const PORT = process.env.PORT 
const cors = require('cors')
app.use(express.json())

console.log(PORT)
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

app.use('/api/blogs', blogRouter)

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.get('/', (req, res) =>{
    res.send('Backend is running')
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
