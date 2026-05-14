import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ DB Connected");

const foodModel = mongoose.models.food || mongoose.model("food", new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
}));

// Upload image to Cloudinary and return the URL
async function uploadToCloudinary(filename) {
    const filePath = path.join(__dirname, "uploads", filename);
    const result = await cloudinary.uploader.upload(filePath, {
        folder: "tomato-food",
        public_id: filename.replace('.png', ''),
    });
    return result.secure_url;
}

// All 32 food items (image will be replaced with Cloudinary URL)
const foodData = [
    { name: "Greek salad", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_1.png", category: "Salad" },
    { name: "Veg salad", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "food_2.png", category: "Salad" },
    { name: "Clover Salad", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "food_3.png", category: "Salad" },
    { name: "Chicken Salad", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "food_4.png", category: "Salad" },
    { name: "Lasagna Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "food_5.png", category: "Rolls" },
    { name: "Peri Peri Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_6.png", category: "Rolls" },
    { name: "Chicken Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "food_7.png", category: "Rolls" },
    { name: "Veg Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "food_8.png", category: "Rolls" },
    { name: "Ripple Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "food_9.png", category: "Deserts" },
    { name: "Fruit Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 22, image: "food_10.png", category: "Deserts" },
    { name: "Jar Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 10, image: "food_11.png", category: "Deserts" },
    { name: "Vanilla Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_12.png", category: "Deserts" },
    { name: "Chicken Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_13.png", category: "Sandwich" },
    { name: "Vegan Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "food_14.png", category: "Sandwich" },
    { name: "Grilled Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "food_15.png", category: "Sandwich" },
    { name: "Bread Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "food_16.png", category: "Sandwich" },
    { name: "Cup Cake", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "food_17.png", category: "Cake" },
    { name: "Vegan Cake", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_18.png", category: "Cake" },
    { name: "Butterscotch Cake", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "food_19.png", category: "Cake" },
    { name: "Sliced Cake", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "food_20.png", category: "Cake" },
    { name: "Garlic Mushroom", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "food_21.png", category: "Pure Veg" },
    { name: "Fried Cauliflower", description: "Food provides essential nutrients for overall health and well-being", price: 22, image: "food_22.png", category: "Pure Veg" },
    { name: "Mix Veg Pulao", description: "Food provides essential nutrients for overall health and well-being", price: 10, image: "food_23.png", category: "Pure Veg" },
    { name: "Rice Zucchini", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_24.png", category: "Pure Veg" },
    { name: "Cheese Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_25.png", category: "Pasta" },
    { name: "Tomato Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "food_26.png", category: "Pasta" },
    { name: "Creamy Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "food_27.png", category: "Pasta" },
    { name: "Chicken Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "food_28.png", category: "Pasta" },
    { name: "Butter Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "food_29.png", category: "Noodles" },
    { name: "Veg Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "food_30.png", category: "Noodles" },
    { name: "Somen Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "food_31.png", category: "Noodles" },
    { name: "Cooked Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "food_32.png", category: "Noodles" },
];

// Upload all images to Cloudinary and update the data
console.log("☁️  Uploading 32 images to Cloudinary...\n");

for (let i = 0; i < foodData.length; i++) {
    const item = foodData[i];
    try {
        const cloudinaryUrl = await uploadToCloudinary(item.image);
        foodData[i].image = cloudinaryUrl;
        console.log(`✅ ${i + 1}/32  ${item.name} → uploaded`);
    } catch (err) {
        console.error(`❌ Failed to upload ${item.image}:`, err.message);
        process.exit(1);
    }
}

// Clear existing and insert with Cloudinary URLs
await foodModel.deleteMany({});
console.log("\n🗑️  Cleared existing food items");

await foodModel.insertMany(foodData);
console.log("🍕 Inserted 32 food items with Cloudinary URLs!\n");

await mongoose.disconnect();
console.log("✅ Done! All images are now on Cloudinary. You can deploy safely.");
process.exit(0);
