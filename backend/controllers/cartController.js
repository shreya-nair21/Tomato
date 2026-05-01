import userModel from "../models/userModel.js"

//add to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.itemId]) {
      cartData[req.itemId] = 1;
    }
    else {
      cartData[req.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Added to cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });

  }
}
//remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
    if (cartData[req.itemId] > 0) {
      cartData[req.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }

}
//get cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addToCart, removeFromCart, getCart }