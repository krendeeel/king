const express = require("express");
const test = require("./routes/test");

const app = express();
app.use(express.json());

app.use("/test", test);

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));