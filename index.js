require('dotenv').config();
/*
const dotenv =require('dotenv')
dotenv.config();
*/
console.log(process.env.CONNECTION_STRING);
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const app = express();
app.use(bodyParser.json());

//Connect to massive 
massive(process.env.CONNECTION_STRING).then(database => {
    //Sets the database.
    app.set('db', database);
    database.get_heroes().then(heroes => {
        console.log(heroes);
    })
})
app.get('/api/heroes', (req, res) => {
    //Scoping issue
    req.app.get('db').get_heroes().then(heroes => {
        res.json({heroes: heroes})
    })
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
})