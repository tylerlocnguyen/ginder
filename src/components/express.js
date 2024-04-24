const express = require('express');
const cors = require('cors');
const database = require('./database');


const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

//Sets up the search tab with express and tries to find the club on the database
database.ready.then(() => {
    app.get('/search', async (req, res) => {
        try {
            const query = new RegExp(req.query.q, 'i'); 
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