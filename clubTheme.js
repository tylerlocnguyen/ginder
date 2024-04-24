const OpenAI = require("openai");
const Database = require('./test_db.js');

const openai = new OpenAI({
    apiKey: "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" // This is also the default, can be omitted
});

//We connect to the MongoDB
const uri = "mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder";
const dbName = "Ginder"
const collectionName = "organizations";

async function main() {
    const database = new Database(uri, dbName, collectionName);
    await database.connect();

    // we grab the name and descriptions of all orgs
    const {names, description} = await database.getSecondColumnFirstRow('newClubThemes.txt');
    const array1 = Array.from(names);
    const array2 = Array.from(description);
    //we will keep track of everythin using strings
    let orgs = "";
    let des = "";
    //all the valid UF themes
    const themes = `

Nursing,
Agricultural and Life Sciences,
Arts,
Business,
Dentistry,
Design,
Construction,
 Planning,
Education,
Engineering,
Health/Human Performance,
Journalism/Communications,
Law,
Liberal Arts,
Medicine,
Pharmacy,
Public Health,
Health Professions,
Veterinary Medicine,
Ambassador,
Community/Volunteer Service,
Cultural,
Fine Arts,
Graduate,
Healthy Living,
Honor Society,
Interfraternity Council,
Media/Publication,
Military,
Multicultural Greek Council,
National Pan-Hellenic Council,
Panhellenic Council,
Political Interests,
Professional/Career,
Recreation,
Religious/Spiritual,
Social and Global Change,
Special Interest,
Sport Clubs,
Student Government Political Party,
    `;

//Test variables
const testTheme = `education, entertainment`;
const meep = testTheme.trim();
const themesString = themes.trim(); 

    //I do batches of clubs instead of all at once, to make it perform faster
    //The index numnbering changes every time and varies depending on the current DB
    for (let i = 962; i <= 1078; i++) {
        
        orgs += `Club Name: ${array1[i]}\n`;
        des += `Club Description: ${array2[i]}\n`
    }
    
    //set up the AI script that takes in the descriptions, names, and all the valid themes
    //and organize them all in the most accurate topics
    //itll also be surrounded by a $
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": ` Here is a string list of club names: ${orgs}
        and description: ${des}. And here are different club themes: ${themesString}.
        Based on the clubs description and themes, organize which fits best and print them out
        also Surround the Club Themes with $. So for example: $Arts, Design$ . DO THIS for each organization individually. final output should be
        Club Name: 
        Club Themes:` }],
        max_tokens: 2048,
    });

    const response = chatCompletion.choices[0].message.content;
    console.log(response);
    console.log("------------------------------");
    //once i get the string with all the club themes, ill use regex to grab the 
    //substring of them, and use that to update the MongoDb and make sure that 
    //it is updating the correct ID
    let regex_command = /\$([^$]*)\$/g;
    let regex_comman = /\$([^$]*)\,/g;
    let regex_themes = response.match(/\$([^$]*)\$/g).map(match => match.slice(1, -1));
    let formattedThemes = regex_themes.map(theme => theme.split(','));

    console.log(array1[20]);
    console.log(formattedThemes[0]);    
    
    //This is how I am updating
    for (let i = 962; i <= 1078; i++) {
       await database.updateDocuments(array1[i], formattedThemes[i-962]);
    }

    //Always close
    await database.close();
}
main();

