const express = require("express");
const zod = require("zod")
const app = express();
const { z } = require('zod');

const schema = zod.array(zod.number());
  
app.use(express.json());

app.post("/health-checkup",  function (req, res) {
  // kidneys = [1, 2]
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys)
  res.send({
    response
  })
});

// Define a Zod schema for user registration
const userSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
});

// Registration endpoint
app.post('/register', (req, res) => {
    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({msg:"smtg wrong"});
    }

    // If validation passes, proceed with user registration logic
    res.status(201).json({ message: 'User registered successfully' });
});

// Start the server
// const PORT = process.env.PORT || 3000;

app.listen(3000, console.log("running on 3k"));