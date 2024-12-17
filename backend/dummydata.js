const mongoose = require("mongoose");
const TourPackage = require("./models/tourModel"); 
const dotenv = require("dotenv");
dotenv.config();
//random ahh data
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB connected");
  const packages = [
    {
        title: "Explore Bali",
        description: "A 7-day tour to the beautiful beaches and cultural landmarks of Bali.",
        price: 1200,
        availableDates: ["2024-12-20", "2024-12-25", "2025-01-05"],
        image: "https://example.com/images/bali-tour.jpg"
    },
    {
        title: "Safari Adventure in Kenya",
        description: "Embark on a thrilling safari across Kenya's best wildlife parks, with opportunities to see lions, elephants, and rhinos.",
        price: 1800,
        availableDates: ["2024-11-01", "2024-12-10", "2025-01-15"],
        image: "https://example.com/images/kenya-saf    ari.jpg"
    },
    {
        title: "Discover the Alps",
        description: "Experience the breathtaking beauty of the Swiss Alps with this 5-day adventure.",
        price: 1500,
        availableDates: ["2024-12-15", "2025-01-10", "2025-03-20"],
        image: "https://example.com/images/alps-tour.jpg"
    },
    {
        title: "Majestic Egypt",
        description: "A historical journey to Egypt to explore the pyramids, temples, and the Nile river.",
        price: 2500,
        availableDates: ["2024-10-05", "2024-11-15", "2025-02-01"],
        image: "https://example.com/images/egypt-tour.jpg"
    },
    {
        title: "Tokyo and Kyoto Cultural Tour",
        description: "A 10-day tour through Japan’s cultural hubs, Tokyo and Kyoto, filled with temples, shrines, and traditional tea ceremonies.",
        price: 2200,
        availableDates: ["2024-11-20", "2024-12-10", "2025-01-25"],
        image: "https://example.com/images/japan-tour.jpg"
    },
    {
        title: "Amazon Rainforest Adventure",
        description: "Venture deep into the Amazon rainforest for a once-in-a-lifetime experience with nature and wildlife.",
        price: 2000,
        availableDates: ["2024-12-01", "2025-01-05", "2025-03-10"],
        image: "https://example.com/images/amazon-tour.jpg"
    },
    {
        title: "Great Wall of China and Beyond",
        description: "Explore the Great Wall, ancient palaces, and other historical wonders of China in this immersive 12-day tour.",
        price: 3000,
        availableDates: ["2024-11-15", "2025-01-10", "2025-02-25"],
        image: "https://example.com/images/china-tour.jpg"
    },
    {
        title: "Mediterranean Cruise",
        description: "A luxury 7-day cruise across the Mediterranean visiting the top cities and beaches.",
        price: 3500,
        availableDates: ["2024-06-01", "2024-08-20", "2025-05-05"],
        image: "https://example.com/images/med-cruise.jpg"
    },
    {
        title: "Greek Island Hopping",
        description: "Discover the beauty of the Greek Islands with this 8-day trip across the Aegean Sea.",
        price: 1800,
        availableDates: ["2024-06-10", "2024-07-15", "2025-04-01"],
        image: "https://example.com/images/greek-islands.jpg"
    },
    {
        title: "New Zealand Adventure",
        description: "Explore the breathtaking landscapes of New Zealand with hiking, biking, and exploring natural wonders.",
        price: 2800,
        availableDates: ["2024-10-15", "2025-01-05", "2025-02-10"],
        image: "https://example.com/images/new-zealand-tour.jpg"
    }
  ];

  await TourPackage.insertMany(packages);
  console.log("Dummy data inserted successfully");

  mongoose.disconnect();
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
