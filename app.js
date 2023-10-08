const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());

const inventory = [];

// POST endpoint to add grocery items
app.post('/add-item', (req, res) => {
  const newItem = req.body.itemName;

  if (newItem) {
    inventory.push({ itemName: newItem }); // Push an object with the itemName property
    res.status(201).json({ message: 'Item added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid item name' });
  }
});

// GET endpoint to retrieve all items in the inventory
app.get('/get-items', (req, res) => {
  res.json({ inventory });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
