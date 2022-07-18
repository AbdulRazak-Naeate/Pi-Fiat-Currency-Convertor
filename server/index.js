const express = require('express');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
require('dotenv/config');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path =require('path');
const fs = require("fs");

//Import Routes
const ratesRoute         = require('./routes/rates');


dotenv.config();

const indexPath  = path.resolve(__dirname, '..client/build', 'index.html');
const whitelist = ['http://localhost:3000',"http://localhost:3002", 'http://localhost:8080', 'https://currencyapi.net']

const corsOptions = {
  origin: function (origin, callback) {
    //console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
     // console.log("Origin acceptable")
      callback(null, true)
    } else {
    //  console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//MiddleWare
app.use(cors(corsOptions)); // package to allow connections from outisde domains
app.use(express.json({limit:'50mb'})); //body-parser alternate
app.use(pino);

// This endpoint is pinged every 5 mins by uptimerobot.com to prevent 
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the 
// componentDidMount of App.js. Once the app is confirmed to be up, we allow 
// the user to perform actions on the client.
app.get('/wake-up', (req, res) => res.json('👌'))

//Route MiddleWares
app.use(express.static('client/build'));
app.use('/api/rates',    ratesRoute);
 

//Home Routes
 app.get('/version',(req,res)=>{
     res.send('Pi Fiat Currency Cnnvertor version 0.1')
 })
const options={ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true }
//Connect to DB
/* mongoose.connect(process.env.DB_COMMUNITY_CON, options)

    const db = mongoose.connection
    db.once('open', _ =>{
         console.log('Database connected : ')
    })  
    db.on('error',err =>{
        console.error('connection eror: ',err)
     }) */

     //load static build folder
     if (process.env.NODE_ENV === 'production') {   
        // console.log("node env : "+process.env.NODE_ENV)

        // Serve any static files
        app.use(express.static(path.resolve(__dirname, '..client/build')));
        
      // Handle React routing, return all requests to React app
        app.get('/*', async(req, res)=> {
         try{
        
           fs.readFile(indexPath,'utf8',(err,htmlData)=>{
             
             if (err){
               console.error("Error during file reading")
               return res.status(404).end()

             } 
           //console.log(product)
            /*  htmlData=htmlData.replace('__META_OG_TITLE__','Pi Fiat Currency Convertor')
             .replace('__META_OG_DESCRIPTION__',"Convert you local Fiat currency to Pi Currency")
             .replace('__META_DESCRIPTION__','Convert you local Fiat currency to Pi Currency')
             .replace('__META_OG_URL__',``)
             .replace('__META_URL__',``)
             .replace('__META_OG_IMAGE__','') */
              //console.log(htmlData);
             res.send(htmlData)
             /*  fs.writeFileSync(indexPath,htmlData,{encoding:'utf8',flag:'w'}) */

           /*   res.render('index.html',{"myname":"Abdul rAZAK","__META_DESCRIPTION__":"Unique Dress"}) */
           })
           
           }catch(err){
           console.log(err)
         }
         
          //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });
      } 

    
//Start lestening to the server
app.set('PORT',process.env.PORT||3004 );
app.listen(app.get('PORT'),()=>{
    console.log(`Server is running on ${app.get('PORT')}`);
});