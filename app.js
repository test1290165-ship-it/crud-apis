const express = require("express")
const mongoose = require("mongoose")
const userouter=require("./routes/user")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")
const app = express()

// const airoutes=require("./routes/ai")
const PORT = 9000

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)
app.use(express.json())
app.use("/api",userouter)
// app.use("/ai",airoutes)
app.use("/assets/upload", express.static("assests/upload"));

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
.then(() => {
    console.log("Connected successfullyyyy")
})
.catch((err) => {
    console.log("Connection failed:", err)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})