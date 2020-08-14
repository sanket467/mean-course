const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

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
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })

});

module.exports = router;