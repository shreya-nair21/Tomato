import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://shreyanair:Shreya1234*@cluster0.tx333cm.mongodb.net/food-del').then(() => console.log("DB Connected"));
}