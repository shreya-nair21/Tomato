import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController"

const cartRouter = express.Router();

//api
cartRouter.post("/add", addToCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/get", getCart);

export default cartRouter;