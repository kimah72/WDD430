const express = require('express');
// a big chain of middleware, like a funnel which we send this express and every part can do something with the request.
const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

// middleware
// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// this is where we are sending the request - we will see json data
app.use("/api/entries", (req, res, next) => {
    const entries = [
        { 
            id: "fadf12123", 
            title: "First server-side entry",
            content: "This is coming from the server"
        },
        {
            id: "krfeu14235",
            title: "Second server-side entry",
            content: "This is coming from the server!"
        }
    ];
    // this tells us that it was succesful
    res.status(200).json({
        message: 'Entry fetched succesfully',
        entries: entries
    });
});

module.exports = app;