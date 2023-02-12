const User = require('../models/user');


const init = () => {
    return new Promise(function(resolve) {
        User.findOne({ email: process.env.ADMIN_EMAIL}, function(err, user) {
            if (err) throw err;
            if (!user) {
                var newAdmin = new User({
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                    role: 'admin'
                });
                newAdmin.save(function(err) {
                    if (err) throw err;
                    resolve();
                })
            } else {
                resolve();
            }
        })
    })
}

module.exports = init