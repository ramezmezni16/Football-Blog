const mongoose = require('mongoose');
require('dotenv').config();


const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;


const uri = `mongodb+srv://${username}:${pw}@ramez.qhihiis.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(()=>console.log(`Connected to ${dbName} database!`))
.catch((err)=>console.log(err));