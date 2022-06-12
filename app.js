const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80

mongoose.connect('mongodb://localhost:27017/device_store')
    .then(() => console.log('MongoDB has started ...')
    )
    .catch(e => console.log(e))

// app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log('App listen 5000');
});

const {userRouter, deviceRouter, authRouter} = require('./routes');

app.use('/devices', deviceRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.end('<h1>Home page</h1>')
})

app.get('/about', (req, res) => {
    res.end('<h1>About page</h1>')
})
