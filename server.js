const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection
connection.once("open",() => {
    console.log("MongoDB Connection established successfully");
})
  

//users routes
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")
const billingRoutes = require("./routes/billingUser/auth")
const kitchenRoutes = require("./routes/kitchenUser/auth")
//category routes
const categoryRoutes = require("./routes/category")
//product routes
const productRoutes = require("./routes/product")
//cart routes
const cartRoutes = require("./routes/cart")

const initialData = require("./routes/admin/initialData")
//Generate qr code
const qrCode = require("./routes/generateQrCode")
//Orders
const orders = require("./routes/order")
//admin orders
const adminOrders = require("./routes/admin/order.route")



app.use("/api/v1",authRoutes)
app.use("/api/v1",adminRoutes)
app.use("/api/v1",initialData)
app.use("/api/v1",billingRoutes)
app.use("/api/v1",kitchenRoutes)
app.use("/api/v1",categoryRoutes)
app.use("/api/v1",productRoutes)
app.use("/api/v1",cartRoutes)
app.use("/api/v1",qrCode)
app.use("/api/v1",orders)
app.use("/api/v1",adminOrders)





app.listen(port,() => {
    console.log(`Server started on port: ${port}`);
})

