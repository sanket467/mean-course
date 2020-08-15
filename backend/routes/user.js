const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const user = require("../../models/user");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User Created !!!",
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })

});


router.post("/login", (req, res, next) => {
    let fetchedUser;

    user.findOne({ email: req.body.email })
        .then(user => {
            fetchedUser = user;
            console.log("1");
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed!"
                });

            }

            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            console.log(result);
            if (!result) {

                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer", { expiresIn: "1h" }
            );

            return res.status(200).json({
                token: token
            })

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed!"
            });
        })

})

module.exports = router;
