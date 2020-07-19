const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();

});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "Post added success!!!"
    });

});



app.get('/api/posts', (req, res, next) => {

    const post = [{

            id: '1234',
            title: 'This is the First Post!!',
            content: 'Welcome to the First Post'

        },
        {

            id: '1235',
            title: 'This is the Second Post!!',
            content: 'Welcome to the Second Post'

        }
    ]

    return res.status(200).json({
        message: "Succesfully fetched all the posts",
        post: post
    });
});


module.exports = app;