const { MongoClient } = require("mongodb");

//constants
const uri = "mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder";
const dbName = "Ginder"
const collectionName = "organizations";

const names = new Set();
const description = new Set();


class Database{ //class for the actual database for easy access in other parts of the project
    constructor(uri, dbName, collectionName){
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(uri);
        this.collection = null;
        this.db = null;
        this.fs = require('fs');
    }


    async logging(){
        console.log("HERE");
    }

    async connect(){ //connect to the database and establishes the collection
        try{
            await this.client.connect();
            console.log("Connected!");
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(collectionName);
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
            //Although this is just the name, you can customzie it so it can query with the other elements 
            const query = {OrganizationName: name};
            const organization = await this.collection.findOne(query);
            
            console.log(organization); // rn just prints it but we can do whatever we want
            //You can return the orgnization JSON then get access to the specfic index for the 
            // name, decription, and theme tags
        }
        catch(error){
            console.error("could not query", error);
        }
    }

    async getbyInterest(tag){ 
        try{
            //TODO- Maybe pass in multiple tags instead of 1-1
            const query = await this.collection.find({ Tags: tag }).toArray();
            
            console.log(query); 
        }
        catch(error){
            console.error("could not query", error);
        }
    }

    async getSecondColumnFirstRow(csvFile) {
        return new Promise((resolve, reject) => {
          this.fs.readFile(csvFile, 'utf8', (err, data) => {

            const lines = data.split('\n');

            
            //console.log('Lines:', lines);  this gives us the whole fucking thing
            //1 : are the names
            //2 : are the description
            for (let i = 0; i < lines.length; i++) {
                const row = lines[i].split(',').map(item => item.trim());
                //console.log('Row:', row[2]); //the rows just use better formatted shit
                names.add(row[1]);
                description.add(row[2]);
            }
            //console.log(names);
            //console.log(description);
            resolve({names,description});
          });
        });
      }
      
      async updateDocuments(name, newThemes) {
        try {
            const query = { OrganizationName: name }; // Filter to find the document by identifier
            const documentToUpdate = await this.collection.findOne(query);
    
            if (!documentToUpdate) {
                console.log(`No document found with name ${name}`);
                return;
            }
    
            // Update the document with the newThemes array
            const updateResult = await this.collection.updateOne(query, { $set: { Tags: newThemes } });
    
            if (updateResult.modifiedCount > 0) {
                console.log(`Updated document with name ${name}`);
            } else {
                console.log(`Document with name ${name} not updated`);
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    }
     
}

async function main(){ //main function for testing purposes
    
    const database = new Database(uri, dbName, collectionName);
    try{
        await database.connect(); //Make sure that the database is always connected first
        await database.getbyInterest("Engineering");  //Im just hard coding the name for testing
        
        console.log("DONE");
    } catch(error){
        console.error("erm", error);
        throw error;
    } finally{
        await database.close();
    }
}

main();

module.exports = main;
module.exports = Database;
