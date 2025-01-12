const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const Response = require("./models/Response");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Route to save response
app.post("/api/response", async (req, res) => {
  const { response } = req.body;

  if (!response) {
    return res.status(400).json({ message: "Response is required!" });
  }

  try {
    const newResponse = new Response({ response });
    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save response." });
  }
});

// Route to get response
app.get("/api/response", async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch responses." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
