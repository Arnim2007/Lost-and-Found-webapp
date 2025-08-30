const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lostfound", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Schema for items
const itemSchema = new mongoose.Schema({
  name: String,
  status: String,
  location: String,
  contact: String,
});

const Item = mongoose.model("Item", itemSchema);

// ✅ Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const { name, status, location, contact } = req.body;
  const newItem = new Item({ name, status, location, contact });
  await newItem.save();
  res.json(newItem);
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:}",{PORT});
});
