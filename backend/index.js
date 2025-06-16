const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();
const cors = require('cors');
app.use(cors());


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

mongoose
  .connect(
    "mongodb+srv://akshayyaru:%23RUA%40cit23-27@backenddb.uugzj.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
