/* import logo from './logo.svg';
 */import { Grid, Typography} from '@mui/material';
import {EmailOutlined} from '@mui/icons-material'
import {useState,useEffect} from 'react';
import axios  from 'axios';
import './App.css';
import ExchangeRates from './components/exchangeRates/ExchangeRates'
import Appbar from './components/appbar/Appbar';
/* import CurrencyLTableList from './components/currenciesRatesTable/CurrencyLTableList'; */
import {data,currencies} from './data.js';

function App() {
  const[pGCV,setPiGCV]=useState(314159);
  const[areRatesLoaded,setAreRatesLoaded]=useState(false);
  const[rates,setRates]=useState([]);

  const formarttoCurrency = (amount)=>{
    var value=0;
    var symbol='$'
  if (amount!==undefined){
    if (amount>=1){
  
      value = symbol +amount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g,"$&,");
    }else{
      value =symbol +amount.toFixed(8).replace(/\d(?=(\d{3})+\.)/g,"$&,");
     }
  }
    return value
    }
    useEffect(()=>{
        if (!areRatesLoaded){
        axios.get('/api/rates').then(response=>{

          //console.log(response.data.rates)
          setRates(response.data.rates);
        })

        }
      return ()=>{
        setAreRatesLoaded(true);
      }
    })
    
  return (
    <div className="App">
      <Appbar/>
      <br/>
      <Grid item xs={3} sm={4} md={6} lg={6}  justifyContent='space-between'>  
        <Typography variant='h5' fontWeight={600} color={'MenuText'}>Pi Global Consensus Value </Typography>
         <Typography variant='h4'  fontWeight={600} color={'red'} >{`${formarttoCurrency(pGCV)}`}</Typography>
        </Grid> 
        
         <Grid container justifyContent={'space-between'}>

        <Grid item xs={12} sm={12} md={12} lg={12}  alignItems='center'>
        <Typography style={{marinTop:'2vh'}} variant='body2' color={'GrayText'} >The app uses real time currency rates from currencypi.net to make the conversion </Typography>
      
        
     {   rates ?  <ExchangeRates rates={rates} data={data} currencies={currencies} pGCV={pGCV} setPiGCV={setPiGCV} formarttoCurrency={formarttoCurrency} />:''
      }
         </Grid>
        </Grid>
      <div className="info">
        <Typography variant='body2' color={'MenuText'}>Pi Global Consensus Value </Typography>
         <Typography variant='body1' color={'red'} >@AbdulRazakNaeate</Typography>  
         <Typography variant="body2" color={'red'}> <a  href='mailto:abdulrazakneate@gmail.com'><EmailOutlined fontSize='small'className='topbarinfoIcon'/></a></Typography>
      </div>
       
            {/*   <CurrencyLTableList/>
 */}
     {/*  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
