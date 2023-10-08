const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemName');
const inventoryList = document.getElementById('inventoryList');

addItemForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const itemName = itemNameInput.value;

  try {
    const response = await fetch('/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemName }),
    });

    if (response.ok) {
      itemNameInput.value = '';
      fetchInventory();
      alert('Item added successfully');
    } else {
      alert('Failed to add item. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});

// Function to fetch and display the inventory list
function fetchInventory() {
  fetch('/get-items')
    .then((response) => response.json())
    .then((data) => {
      const items = data.inventory;
      inventoryList.innerHTML = '';
      items.forEach((itemObj) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = itemObj.itemName;
        inventoryList.appendChild(itemElement);
      });
    })
    .catch((error) => {
      console.error('Error fetching inventory:', error);
    });
}

// Initial fetch to populate the inventory list when the page loads
fetchInventory();
