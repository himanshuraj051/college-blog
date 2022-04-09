const { hash, genSalt } = require('bcrypt');
const User = require('../models/user');

module.exports.createUserForm = (req, res) => {
    res.render('signupForm');
}

module.exports.createUser = async(req, res) => {
    try {
        let { fullName, email, password, department } = req.body;

        // const salt = await genSalt();
        const hashedPassword = await hash(password, 10);
        password = hashedPassword;

        await User.create({
            fullName,
            email,
            department,
            password
        });
        res.send('user created')
    } catch (err) {
        console.log(err);
    }
}