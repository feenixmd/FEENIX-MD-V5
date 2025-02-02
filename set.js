const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lkbkpRUHJWRVhWUXdlNkUwMTQ5L2tIMmVwK200c2hDcERSa0E4cHNXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEtxZnQ4LzZ1UGxtQmdya2hVQkQ2TzFzOWtFVmRoZ3R5cEtZVDA0V1NTUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRS3gxcHhuMVpEVnk1TDBkQmtLaW1tQkNHdzFpVTNqaEtVV09xb25BV0hNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1KzdydFJEV2ZpNEhIUE1tMmVJaXRKN25EMlJuQk1NNDN3RkcyQk1DaTE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGM0tHM1hGeE1zTEpIenlyZkpWT0dHSEM1dm9NL2xvSGlFZWZ2RUxXVU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNwMnZCOUxKay9rbDYwak96Zmx3SFhwZ2lwVlVvbXF6TGZXeDJzTm9Td2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZ5bTluV20zQUV2YVF2YitFUUJ3ZVY2R0lqbUh3MFU2ZVIrNnFWdnltND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhMQXpkUHAwUlgwa1JoWWt1VHRUYXBsODFNVnZjM1BJd2xLQU5meE9Eaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdreWNXVEN3THVrNXlpUVM2SExMM2xGYkJia3JWSVF0a2crK3IxMnc1b1k2TDFnelk1THk4UnNFeWdFM2QvT25vYitXZmxsaWl5OXNjbUZzODU1WWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUwLCJhZHZTZWNyZXRLZXkiOiJDc0ZrbFo2N0pyT3VrMU5GZDZlRDFUaGYra2wwc0diWVE1TEExT3BNMDFZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4SEdqSVRIWFFCQ3c0b1lWSmNnR25nIiwicGhvbmVJZCI6IjE5MGRmMzUzLTcyYzYtNDhiOC1iZWY2LTJiMWU5ZTg4NzEzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4UFVmaktDRDJ1b1lCSTR2dXJhT05WNnNaWmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlFEL0EyZnVtdjdmRExtVWhSK0xOa3FKYVBjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZFRkpWUEdEIiwibWUiOnsiaWQiOiI5NDc0MzcwNjI4Mzo2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJdkRpNUVIRUlyTSs3d0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkeHdmcXRTSnAyeVJzNjhGbm5kV0pqc2h4SUVHWE16aVFMTFNEZWlpTlVRPSIsImFjY291bnRTaWduYXR1cmUiOiIzWDhiOHdnbFVEZ3hsaDlINEdkbHNQT0VUU3hHY1g5eUlKcXl3aFlpUE1JMUMzcW5tdHRpcnNtRjZ0WENvYVNDdzNsR1hvZ0F2dGxzZk5aMHM0TDZEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYTVWdlg4cTZXOXFKRHVsQmw4KzNyclg0b3pSSXhMR2xtT2NHY0RsYm04cWpCR3hLRlFYMHRvdUdBaXZhMzFLM3dXODh0SUFnMWdrZUdSYmVVWUNnaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc0MzcwNjI4Mzo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhjY0g2clVpYWRza2JPdkJaNTNWaVk3SWNTQkJsek00a0N5MGczb29qVkUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg0NjY4MzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmRqIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  feenix  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
