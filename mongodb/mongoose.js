const mongoose = require("mongoose")
const { string } = require("zod")
mongoose.connect("mongodb://localhost:27017/test")//test is name of database

const User = mongoose.model("User", { name: String, email: String, password: String })

const user = new User({
    name: "Channaveer",
    email: "chan@gmail.com",
    password: "12345"
})

user.save()//save the user to database