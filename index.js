const express = require("express");
const mongoose = require("mongoose");
const login = require("./routes/login");
const register = require("./routes/rigister");
const users = require("./routes/users");
const upload = require("./routes/upload");

const app = express();
app.use(express.json());

app.use("/login", login);
app.use("/register", register);
app.use("/users", users);
app.use("/upload", upload);

app.get("/fi", (req, res) => {
    return res.json('15')
})


const port = process.env.PORT || 9001;

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb+srv://roman:qaz753@cluster0.twy7wbm.mongodb.net/?retryWrites=true&w=majority")
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()