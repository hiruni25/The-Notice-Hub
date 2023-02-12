const express = require('express');
var cors = require('cors')



const app = express();
app.use(cors())
// const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors')
const bodyparser = require('body-parser')


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());

// Import all routes
const auth = require('./routes/auth');
const notice = require('./routes/notice');

app.use('/api/v1', notice)
app.use('/api/v1', auth)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app