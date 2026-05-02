import mongoose from "mongoose";
import orderModel from "./models/orderModel.js";
import userModel from "./models/userModel.js";

const fetchData = async () => {
  try {
    await mongoose.connect('mongodb+srv://shreyanair:Shreya1234*@cluster0.tx333cm.mongodb.net/food-del');
    const users = await userModel.find({});
    const orders = await orderModel.find({});
    console.log("Users:", users.map(u => ({ id: u._id, email: u.email })));
    console.log("Orders count:", orders.length);
    if(orders.length > 0){
        console.log("Sample order userId:", orders[0].userId);
        console.log("Sample order items:", orders[0].items.map(i => i.name));
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fetchData();
