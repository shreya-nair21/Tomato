import foodModel from "../models/foodModel.js"
import { cloudinary } from "../config/cloudinary.js"

// add food item

const addFood = async (req, res) => {
    // req.file.path = full Cloudinary URL
    // req.file.filename = Cloudinary public_id (for deletion)
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.path  // full Cloudinary URL stored directly
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// all food list
const listFood = async(req, res) => {
    try{
        const foods = await foodModel.find({})
        res.json({success:true, data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false, message:error})
    }
}

// remove food item
const removeFood = async(req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);

        // Extract public_id from the Cloudinary URL and delete it
        if (food.image) {
            // URL looks like: https://res.cloudinary.com/.../tomato-food/abc123.jpg
            const parts = food.image.split('/');
            const filenameWithExt = parts.pop();          // abc123.jpg
            const folder = parts.pop();                    // tomato-food
            const publicId = `${folder}/${filenameWithExt.split('.')[0]}`;
            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
export { addFood, listFood, removeFood }