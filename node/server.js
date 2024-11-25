import express from "express";
import cors from "cors";
import { ConnDb } from './db/db.js';
import router from './Router/authRouter.js';
import dotenv from "dotenv";
import categoryrouter from "./Router/CategoryRouter.js";
import productrouter from "./Router/ProductRouter.js"



const app = express()

dotenv.config()

ConnDb()

app.use(express.json())
app.use(cors());

app.use("/api/v1/auth", router)
app.use("/api/v1/category", categoryrouter)
app.use("/api/v1/products", productrouter)

app.get("/", (req, res) => {
    res.send("<h1>Welvome</h1>")
})

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080")
})