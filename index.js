const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

// Function to read data from file
function readDataFromFile(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(data));
        }
    });
}

// Function to write data to file
function writeDataToFile(data, callback) {
    fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
        if (err) {
            console.error('Error writing file:', err);
        }
        callback();
    });
}

// Function to create a new item
function createItem(item, callback) {
    readDataFromFile(existingData => {
        const newData = [...existingData, item];
        writeDataToFile(newData, callback);
    });
}

// Function to read all items
function getAllItems(callback) {
    readDataFromFile(callback);
}

// Function to update an item
function updateItem(index, newItem, callback) {
    readDataFromFile(existingData => {
        existingData[index] = newItem;
        writeDataToFile(existingData, callback);
    });
}

// Function to delete an item
function deleteItem(index, callback) {
    readDataFromFile(existingData => {
        existingData.splice(index, 1);
        writeDataToFile(existingData, callback);
    });
}

// Example usage:

// Create a new item
createItem({ name: 'Item 1', quantity: 5 }, () => {
    console.log('Item created.');
});

// Read all items
getAllItems(data => {
    console.log('All items:', data);
});

// Update an item at index 0
updateItem(0, { name: 'Updated Item', quantity: 10 }, () => {
    console.log('Item updated.');
});

// Delete an item at index 0
deleteItem(0, () => {
    console.log('Item deleted.');
});
