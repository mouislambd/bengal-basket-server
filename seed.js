import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import dns from "dns";
import FoodItem from "./models/FoodItem.js";

dns.setServers(['8.8.8.8', '8.8.4.4']);

const foodItems = [
    {
        title: "Chicken Biryani",
        shortDescription: "Aromatic rice with tender chicken pieces",
        fullDescription: "Traditional Bengali-style chicken biryani cooked with basmati rice, saffron, and authentic spices. Served with raita and salad.",
        price: 280,
        category: "Rice",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
        rating: 4.5,
        location: "Dhanmondi, Dhaka",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Beef Tehari",
        shortDescription: "Spicy beef rice with potatoes",
        fullDescription: "Classic Bengali tehari with tender beef chunks, potatoes, and fragrant rice cooked in mustard oil.",
        price: 220,
        category: "Rice",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500",
        rating: 4.7,
        location: "Mirpur, Dhaka",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Fish Curry",
        shortDescription: "Traditional Bengali fish curry",
        fullDescription: "Rui fish cooked in a rich mustard and turmeric gravy, a Bengali household favorite.",
        price: 250,
        category: "Curry",
        image: "https://images.unsplash.com/photo-1626777553635-be09e0c0b537?w=500",
        rating: 4.3,
        location: "Rangpur",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Mutton Rezala",
        shortDescription: "Rich and creamy mutton curry",
        fullDescription: "Slow-cooked mutton in a creamy yogurt-based gravy with whole spices, a Mughlai delicacy.",
        price: 350,
        category: "Curry",
        image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=500",
        rating: 4.8,
        location: "Gulshan, Dhaka",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Vegetable Khichuri",
        shortDescription: "Comfort food rice and lentil mix",
        fullDescription: "A wholesome mix of rice, lentils, and seasonal vegetables cooked with ghee, perfect for rainy days.",
        price: 150,
        category: "Rice",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
        rating: 4.1,
        location: "Rangpur",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Chicken Roll",
        shortDescription: "Crispy paratha wrapped chicken roll",
        fullDescription: "Grilled chicken with fresh vegetables and sauce wrapped in a crispy paratha, perfect street food.",
        price: 90,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500",
        rating: 4.2,
        location: "Rangpur",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Beef Kala Bhuna",
        shortDescription: "Dark rich beef curry, Chittagong style",
        fullDescription: "Slow-cooked beef in a dark, thick gravy with roasted spices, a specialty from Chittagong.",
        price: 300,
        category: "Curry",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500",
        rating: 4.9,
        location: "Chittagong",
        addedBy: "admin@bengalbasket.com",
    },
    {
        title: "Mango Lassi",
        shortDescription: "Refreshing mango yogurt drink",
        fullDescription: "Creamy yogurt blended with fresh mango pulp, a perfect summer refreshment.",
        price: 70,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
        rating: 4.4,
        location: "Dhanmondi, Dhaka",
        addedBy: "admin@bengalbasket.com",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected for seeding");

        await FoodItem.deleteMany({});
        console.log("Old data cleared");

        await FoodItem.insertMany(foodItems);
        console.log(`${foodItems.length} food items seeded!`);

        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error.message);
        process.exit(1);
    }
};

seedDB();