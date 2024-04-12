const { MongoClient } = require("mongodb");

//constants
const uri = "mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder";
const dbName = "Ginder"
const collectionName = "organizations";



class Database{ //class for the actual database for easy access in other parts of the project
    constructor(uri, dbName, collectionName){
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(uri);
        this.collection = null;
        this.db = null;
        this.ready = this.connect();
    }


    async connect(){ //connect to the database and establishes the collection
        try{
            await this.client.connect();
            console.log("Connected!");
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(collectionName);
            await this.collection.createIndex({ name: 'text' });
    }
        catch(error){
            console.error("did not connect to mongodb", error);
        }
    }


    async close(){ //closes the connection after *VERY IMPORTANT*
        try{
            await this.client.close();
            console.log("connection closed");
        }
        catch(error){
            console.error("could not close", error);
        }
    }

    async getbyName(name){ //queries the database by name or the org
        try{
            const query = {OrganizationName: name};
            const organization = await this.collection.findOne(query);

            console.log(organization); // rn just prints it but we can do whatever we want
        }
        catch(error){
            console.error("could not query", error);
        }
    }

    async updateDocuments(identifier, newFieldData) {
        try {
            const query = {OrganizationName: name}; // Filter to find the document by identifier
            const documentToUpdate = await this.collection.findOne(query);
    
            if (!documentToUpdate) {
                console.log(`No document found with id ${identifier}`);
                return;
            }
    
            // Update the document by adding or updating the new field
            const updatedDocument = {
                ...documentToUpdate,
                newField: newFieldData // Assuming newFieldData is the value to be added/updated
            };
    
            // Update the document in the collection
            const updateResult = await this.collection.updateOne(filter, { $set: updatedDocument });
    
            if (updateResult.modifiedCount > 0) {
                console.log(`Updated document with id ${identifier}`);
            } else {
                console.log(`Document with id ${identifier} not updated`);
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    }
}





const database = new Database(uri, dbName, collectionName);
module.exports = database;


process.on('exit', async () => {
    await database.close();
});
