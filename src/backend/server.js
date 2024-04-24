const express = require('express');
const Database = require('./app'); // Assuming app.js is in the same directory
const cors = require('cors'); // Import cors
const app = express();

app.use(cors()); // Use cors middleware
// Create a new instance of the Database class
const database = new Database("mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder", "Ginder", "organizations");

// Connect to the database
database.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    // Define your routes here
    app.get('/organizations', async (req, res) => {
      try {
          const organizations = await database.getAllOrganizations();
          res.json(organizations);
      } catch (error) {
          console.error('Error fetching organizations:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });  
    
    // Start the server
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
