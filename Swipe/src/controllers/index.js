const Database = require('./app');

// Define MongoDB connection string
const uri = "mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder";
const dbName = "Ginder";
const collectionName = "organizations";

async function main() {
    const database = new Database(uri, dbName, collectionName);
    try {
        await database.connect();
        await database.getByName("Vietnamese Student Organization");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await database.close();
    }
}

main();
