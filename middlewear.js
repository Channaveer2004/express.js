const express = require('express')
const app = express()
const PORT = 3000;
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}
app.use(myLogger)

const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}
app.use(requestTime)

app.get('/', (req, res) => {
    let responseText = 'Hello World!<br>'
    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
})

// async function validateCookies (req, res, next) {
//     await cookieValidator(req.cookies)
//     next()
//   }
  
//   app.use(cookieParser())
  
//   app.use(validateCookies)
  
//   // error handler
//   app.use((err, req, res, next) => {
//     res.status(400).send(err.message)
//   })

app.listen(PORT, () => {
    console.log(`running on port: ${PORT} `)
})