const express = require("express")
const users = require("./MOCK_DATA.json")
const PORT = 8000
const app = express()
const fs = require("fs")
const { error } = require("console")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => {
        return (
            `<li>${user.first_name}</li>`
        )
    }).join("")}
        </ul>
    `;
    res.send(html)
})

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find(user => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
        const id = Number(req.params.id)
        const user = users.find(user => user.id === id);

        if (!err) {
            res.status(404).json({ status: "error", message: "user not found" })
        }

        else {

            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
        }
        return res.json(user)
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        const user = users.findIndex(user => user.id === id);

        if (user !== -1) {
            users.splice(user, 1);
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "Failed to save data" });
                }
                return res.json(users);
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    })

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log("Request body:", req.body);
    // console.log("hi")

    if (!body.first_name || !body.last_name || !body.email) {
        return res.status(404).json({ status: "error", message: "invalid data entered" })
    }

    const newUser = { ...body, id: users.length + 1 }
    users.push(newUser)

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).json({ message: "Failed to add user" })
        }
        return res.json({ status: "success", id: users.length })
    })
})


app.listen(PORT, () => console.log("running on port 8k"))