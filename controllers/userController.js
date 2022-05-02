const { hash, genSalt, compare } = require('bcrypt');
const { render } = require('express/lib/response');
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
        console.log("here", req.body.password);
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
                id: user._id,
                email,
                fullName: user.fullName,
                department: user.department
            }
            const token = await jwt.sign(loggedInUser, 'secret_key')
            console.log(token);

            req.session.token = token;
            req.session.username = user.fullName;

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

        res.locals.username = user.fullName;

        if (!user) {
            return res.redirect('/user/login');
        }

        req.user = user;
        next();
    } catch (err) {
        res.redirect('/user/login');
    }
}

module.exports.logout = (req, res) => {
    render.render('/user/login');
}