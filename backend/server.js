import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors({
  origin: [
    "https://tomato-frontend-rho.vercel.app",
    "https://tomato-admin-neon.vercel.app",
    "http://localhost:5173",  // local dev
    "http://localhost:5174"   // local admin dev
  ]
}))

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})

