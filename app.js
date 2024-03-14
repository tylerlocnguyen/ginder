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
            const query = {OrganizationName: name};
            const organization = await this.collection.findOne(query);

            console.log(organization); // rn just prints it but we can do whatever we want
        }
        catch(error){
            console.error("could not query", error);
        }
    }
}



async function main(){ //main function for testing purposes
    const database = new Database(uri, dbName, collectionName);
    try{
        await database.connect();
        await database.getbyName("Vietnamese Student Organization");
    }
    catch(error){
        console.error("erm", error);
    }
    finally{
        await database.close();
    }

}

main();