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

app.use(express.urlencoded({ extended: true }));


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

// const spotlightDealsRoutes = require("./routes/spo");
const cartRoutes= require("./routes/cartRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const OrderRoutes = require("./routes/orderRoute");
const DoorRoutes = require("./routes/doorsRoute")
const AppointmentRoutes = require("./routes/appointmentRoute");
const WindowsRoute = require("./routes/windowsRoute");
const EstimateRoute = require("./routes/estimateRoute");
const PersonalDetailsRoute = require("./routes/personalDetailsRoute");
const HardwareRoute = require("./routes/hardwareRoute");
const EntryDoorRoute = require("./routes/EntryDoorRoute");
const BiFoldDoorRoutes = require("./routes/biFoldDoorRoutes");

// app.use("/api", spotlightDealsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/doors", DoorRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/appointments", AppointmentRoutes);
app.use("/api/windows", WindowsRoute);
app.use("/api/estimate", EstimateRoute);
app.use("/api/personalDetails", PersonalDetailsRoute);
app.use("/api/hardware",HardwareRoute );
app.use("/api/entryDoor",EntryDoorRoute);
app.use("/api/biFoldDoors",BiFoldDoorRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});