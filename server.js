const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
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

const spotlightDealsRoutes = require("./src/routes/route");
const cartRoutes= require("./src/routes/cartRoutes");
const CategoryRoutes = require("./src/routes/CategoryRoutes");
const OrderRoutes = require("./src/routes/orderRoute");
const DoorRoutes = require("./src/routes/doorsRoute")
const AppointmentRoutes = require("./src/routes/appointmentRoute");
const WindowsRoute = require("./src/routes/windowsRoute");

app.use("/api", spotlightDealsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/doors", DoorRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/appointments", AppointmentRoutes);
app.use("/api/windows", WindowsRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
