// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware for parsing JSON in request body
app.use(bodyParser.json());

// Array to store items (instead of using a database)
let shopItems = [];
let nextId = 1;

// Routes

// Get all items
app.get("/items", (req, res) => {
  res.json(shopItems);
});

// Get a single item by ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Get ID from request parameter
  const item = shopItems.find((i) => i.id === id); // Find item by ID
  if (!item) {
    return res.status(404).json({ error: "Item not found" }); // If item not found
  }
  res.json(item); // Return the item
});

// Add a new item
app.post("/items", (req, res) => {
  const { name, description, price } = req.body; // Extract data from request body
  if (!name || !description || !price) {
    return res
      .status(400)
      .json({ error: "Name, description, and price are required" }); // Check for required fields
  }

  const newItem = { id: nextId++, name, description, price }; // Create new item
  shopItems.push(newItem); // Add the item to the array
  res.status(201).json(newItem); // Return the new item with status 201 (created)
});

// Update an item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Get ID from request parameter
  const { name, description, price } = req.body; // Extract data from request body
  const item = shopItems.find((i) => i.id === id); // Find item by ID

  if (!item) {
    return res.status(404).json({ error: "Item not found" }); // If item not found
  }

  // Update item fields if they are present in the request
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  if (price !== undefined) item.price = price;

  res.json(item); // Return the updated item
});

// Delete an item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Get ID from request parameter
  const itemIndex = shopItems.findIndex((i) => i.id === id); // Find index of item by ID

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" }); // If item not found
  }

  shopItems.splice(itemIndex, 1); // Remove the item from the array
  res.status(204).send(); // Return status 204 (successfully deleted) with no content
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
