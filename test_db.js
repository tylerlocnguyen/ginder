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

            //console.log(organization); // rn just prints it but we can do whatever we want
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
            for (let i = 1; i <= 5 && i < lines.length; i++) {
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
      
      
      
}

class AI{
    //177e6668a9e32c34f49aca84eaadccf4ab769ad84900374d668fa40b3b71e3a6
    constructor(token, dbName, collectionName){
        this.token = token;
        this.client = OpenAI(api_key=token,
            base_url='https://api.together.xyz',
          )
        
    }
}
// Example usage


async function main(){ //main function for testing purposes
    
    const database = new Database(uri, dbName, collectionName);
    const name_description = new Set();
    //name_description.add(row[1]);
    try{
        
         const {names, description} = await database.getSecondColumnFirstRow('UFclubs.csv');
       //console.log('First three rows of the second column:', names);
       await database.connect();
        //await database.getbyName("Vietnamese Student Organization");
       //for (const n of names){
        //await database.getbyName(n);
        //name_description.add(await database.getbyName(n));
      
       //}
       //module.exports = name_description;
       console.log("DONE");
       module.exports = {names, description};
       
       
    }
 
    catch(error){
        console.error("erm", error);
    }
    finally{
        await database.close();
    }
    
    
}
//export const {names, description} = await database.getSecondColumnFirstRow('UFclubs.csv');
//console.log(names);
  //  console.log(description);
module.exports = Database; // Export the Database class
main();
