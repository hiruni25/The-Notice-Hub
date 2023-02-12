const mongoose = require('mongoose');
const {
    registerAdmin
  } = require("../controllers/authController");

const connectDatabase = () => {
    console.log(process.env.DB_LOCAL_URI)
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)

    })
}

module.exports = connectDatabase