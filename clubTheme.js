const OpenAI = require("openai");
const Database = require('./test_db.js');

const openai = new OpenAI({
    apiKey: "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" // This is also the default, can be omitted
});

const uri = "mongodb+srv://tylerlocnguyen:YISO1kXrQhXFyyst@ginder.7z44ilc.mongodb.net/?retryWrites=true&w=majority&appName=Ginder";
const dbName = "Ginder"
const collectionName = "organizations";

async function main() {
    const database = new Database(uri, dbName, collectionName);
    await database.connect();

    const {names, description} = await database.getSecondColumnFirstRow('newClubThemes.txt');
    const array1 = Array.from(names);
    const array2 = Array.from(description);
    let orgs = "";
    let des = "";
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

const testTheme = `education, entertainment`;
const meep = testTheme.trim();
const themesString = themes.trim(); 

    for (let i = 962; i <= 1078; i++) {
        //console.log(array1[i], array2[i]);
        orgs += `Club Name: ${array1[i]}\n`;
        des += `Club Description: ${array2[i]}\n`
    }
    
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
    let regex_command = /\$([^$]*)\$/g;
    let regex_comman = /\$([^$]*)\,/g;
    let regex_themes = response.match(/\$([^$]*)\$/g).map(match => match.slice(1, -1));
    let formattedThemes = regex_themes.map(theme => theme.split(','));

    console.log(array1[20]);
    console.log(formattedThemes[0]);    
    
    for (let i = 962; i <= 1078; i++) {
       await database.updateDocuments(array1[i], formattedThemes[i-962]);
    }
    await database.close();
}
main();

