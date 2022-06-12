const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80

mongoose.connect('mongodb+srv://Georgiy:georgiy1234@myclaster.j4gkvjp.mongodb.net/?retryWrites=true&w=majority/device_shop')
    .then(() => console.log('MongoDB has started ...')
    )
    .catch(e => console.log(e))

// app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.listen(5000, () => {
    console.log('App listen 5000');
});

const {userRouter, deviceRouter, authRouter} = require('./routes');

app.use('/devices', deviceRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

