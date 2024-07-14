const express = require("express");
const port = 4002
const app = express()

app.get('/', (req,res)=>{
    res.send("Helloooo chan")
})

app.listen(port, ()=>{
    console.log("Example app is listening")
})



