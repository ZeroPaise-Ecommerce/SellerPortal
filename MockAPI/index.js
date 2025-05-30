const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock data
const dummyData = 
[{
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 145,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-002",
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    stock: 78,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-003",
    name: "Running Shoes",
    category: "Apparel",
    price: 119.99,
    stock: 212,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-004",
    name: "Organic Cotton T-shirt",
    category: "Apparel",
    price: 24.99,
    stock: 0,
    status: "Out of Stock",
    active: false
  },
  {
    id: "PRD-005",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 34.99,
    stock: 87,
    status: "In Stock",
    active: true
  },
  {
    id: "PRD-006",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 149.99,
    stock: 23,
    status: "Low Stock",
    active: true
  },
  {
    id: "PRD-007",
    name: "Yoga Mat",
    category: "Sports",
    price: 45.99,
    stock: 62,
    status: "In Stock",
    active: true
  },
];// Mock product data
// Routes
app.get('/products', (req, res) => {
  res.json({ data: dummyData });
});

app.post('/products', (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    dummyData.push(newItem);
    res.json({ message: 'Data saved successfully', payload: { newItem } });
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`);
});