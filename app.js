const express = require('express');
const database = require('./database'); // Path to your database.js file

const app = express();
const port = 5500;

app.use(express.json()); // for parsing application/json

// Define routes and perform MongoDB operations here
database.ready.then(() => {
    app.get('/search', async (req, res) => {
        try {
            const query = new RegExp(req.query.q, 'i'); // 'i' makes it case insensitive
            const results = await database.collection.find({ OrganizationName: query }).toArray();
            console.log(results);
            res.json(results);
        } catch (error) {
            console.error('Error in find operation:', error);
            res.status(500).json({ error: 'An error occurred while searching the database' });
        }
    });
    });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});