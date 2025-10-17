require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const config = require("./config/config");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = config.port;

// ⚠️ CRITICAL: Body parser middleware MUST come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// Connect to MongoDB
connectDB()
    .then(() => {
        console.log('✅ MongoDB connection check: Success');
    })
    .catch((err) => {
        console.log('❌ MongoDB connection check: Failed', err.message);
    });

// Root Endpoint
app.get("/", (req, res) => {
    res.json({ message: "Hello from POS Server!" });
});

// API Routes - These come AFTER middleware
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Global Error Handler - MUST be LAST
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`🚀 POS Server is listening on port ${PORT}`);
});