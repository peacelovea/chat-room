const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const registerRoutes = require("./routes/userRotes")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth", registerRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})