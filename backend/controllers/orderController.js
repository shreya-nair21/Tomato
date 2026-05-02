import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save order to DB
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Options for Razorpay Order
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: newOrder._id.toString(), // tie DB order ID to receipt
    };

    // Create order on Razorpay
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Send order details to frontend!
    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error processing payment order" });
  }
};

// Verification mechanism
const verifyOrder = async (req, res) => {
  const { orderId, success, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  try {
    if (success === "true") {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        res.json({ success: true, message: "Paid" });
      } else {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "Not Paid - Invalid Signature" });
      }
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};


//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId, payment: true });
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}
export { placeOrder, verifyOrder, userOrders };