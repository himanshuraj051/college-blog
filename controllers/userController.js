const { hash, genSalt, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.createUserForm = (req, res) => {
    res.render('signupForm');
}

module.exports.loginForm = (req, res) => {
    res.render('loginForm');
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

module.exports.authenticateUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.send("User does not exist!!");
        }

        if (await compare(password, user.password)) {
            let loggedInUser = {
                email,
                fullName: user.fullName,
                department: user.department
            }
            const token = await jwt.sign(loggedInUser, 'secret_key')
            console.log(token);

            req.session.token = token;

            return res.redirect('/blog');
        }

        return res.send("invalid credentials!!!");

    } catch (err) {
        console.log(err);
    }
}

module.exports.authenticateToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.params.token;

        if (token == null) return res.send("Please log in!!");

        let user = await jwt.verify(token, 'secret_key');
        console.log(user);

        if (!user) {
            return res.redirect('/user/login');
        }

        req.user = user;
        next();
    } catch (err) {
        res.redirect('/user/login');
    }
}