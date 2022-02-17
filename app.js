const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//todo helmet, cors, fileUpload
mongoose.connect('mongodb://localhost:27017/device_store')
    .then(() => console.log('MongoDB has started ...')
    )
    .catch(e => console.log(e))

app.listen(5000, () => {
    console.log('App listen 5000');
});

const {userRouter, deviceRouter, authRouter} = require('./routes');

app.use('/devices', deviceRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
