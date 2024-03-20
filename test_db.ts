// app.ts
const main = require('./test_db.js');
async function run() {
    try {
        const { names, description } = await main(); // Wait for the main function to complete
        console.log(names);
        console.log(description);
    } catch (error) {
        console.error("Error:", error);
    }
}

run(); // Execute the run function
