const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./db");
const uploadDir = require("path").join(__dirname, "uploads");
const fs = require("fs");
const session = require("express-session");

dotenv.config();

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

connectDB();

const spotlightDealsRoutes = require("../routes/route");
const cartRoutes= require("../routes/cartRoutes");
const CategoryRoutes = require("../routes/CategoryRoutes");
const DoorRoutes = require("../routes/DoorsRoute");

app.use("/api", spotlightDealsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/doors", DoorRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
