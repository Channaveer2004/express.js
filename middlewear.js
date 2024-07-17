const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const cookieValidator = require('./cookieValidator');

// Logger middleware
const myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};
app.use(myLogger);

// Request time middleware
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};
app.use(requestTime);

// Define a route with error handling
app.get('/', (req, res, next) => {
    try {
        let responseText = 'Hello World!<br>';
        responseText += `<small>Requested at: ${req.requestTime}</small>`;
        res.send(responseText);
    } catch (err) {
        next(err); // Pass any errors to the global error handler
    }
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something broke!'); 
});


app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
});
