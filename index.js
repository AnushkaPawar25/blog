require('dotenv').config()
const express = require('express')

const { default: mongoose } = require('mongoose')
const blogRouter= require('./controllers/blogController');

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

app.get('/', (req, res) =>{
    res.send('Backend is running')
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const blogRouter = require('./controllers/blogController');

// const app = express();
// const PORT = process.env.PORT || 3002;

// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// app.use('/api/blogs', blogRouter);

// app.get('/', (req, res) => {
//     res.send('Backend is running');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
