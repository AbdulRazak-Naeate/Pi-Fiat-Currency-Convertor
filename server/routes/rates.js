const express =require('express');
const router = express.Router();
 const fetch = require('node-fetch');


router.get('/',async(req,res)=>{

    getCurrencies(req,res);

})
function getCurrencies(req,res){
    var url = `https://currencyapi.net/api/v1/currencies?key=${process.env.CURRENCY_API_KEY}&output=JSON`;

    fetch(url)
    .then(res => res.json())
    .then(json =>{
         var currencies=json.currencies;

         getRates(req,res,currencies)
    }
   );
}

function getRates(req,res,currencies){
    var url = `https://currencyapi.net/api/v1/rates?key=${process.env.CURRENCY_API_KEY}&output=JSON`;

    fetch(url)
    .then(res => res.json())
    .then(json =>{
        var rates= restructureObject(json.rates,currencies)
         return res.json({rates:rates})}
   );

}


function restructureObject(tmprates,tmpcurrencies){

    var arrRates = [];

  for(var property in tmprates){

   var obj={"name": property,
            "value":tmprates[property],
            "country":tmpcurrencies[property]
           } 
   arrRates.push(obj)
}
return arrRates
}

module.exports = router;