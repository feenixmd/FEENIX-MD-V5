"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { france } = require("../framework/france");
france({ nomCom: "repo", reaction: "⚔", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


const githubRepo = 'https://github.com/feenixmd/FEENIX-MD-V5';
const img = 'https://telegra.ph/file/5c12fd15ac105b0b85ac8.mp4';


    const response = await fetch(githubRepo); 
        const data = await response.json(); 

        if (data) {
            const repoInfo = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                lastUpdate: data.updated_at,
                owner: data.owner.login
            };
const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
            const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString('en-GB');

const gitdata = `Hy 👋 
This is *FEENIX-MD-V5.* The following is *FEENIX-MD-V5's*
*REPOSITORY:* ${data.html_url}
✨ *STARS:* ${repoInfo.stars}
🧧 *FORKS:* ${repoInfo.forks}
📅 *RELEASED:* ${releaseDate}
🕐 *LAST UPDATED:* ${lastUpdateDate}
👨‍💻 *OWNER:* *FEENIX🍁*`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

   /* let z = 'Hello This is  *FEENIX-MD-V5* \n\n ' + "The Following is *FEENIX-MD-V5 Repo.*";
    let d = ' https://github.com/feenixmd/FEENIX-MD-V5';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/5c12fd15ac105b0b85ac8.mp4';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");*/
