const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectdb } = require("./config/db");

const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();



const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173", 
        methods: ["GET", "POST", "PUT", "DELETE"], 
        credentials: true, 
    })
); 
app.use(express.json());



app.use("/api" , tourRoutes);
app.use("/api" , bookingRoutes);
app.use("/api" , adminRoutes);


// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join( __dirname , "/frontend/dist")));

//     app.get("*" , (req , res) => {
//         res.sendFile(path.resolve(__dirname , "frontend" , "dist" , "index.html")); 
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port " , PORT);
    connectdb();
});

