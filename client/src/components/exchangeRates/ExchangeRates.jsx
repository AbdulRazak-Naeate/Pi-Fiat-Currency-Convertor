import { Grid, Typography,Select,FormControl,InputLabel,MenuItem,TextField} from '@mui/material';
import React,{useState,useEffect} from 'react';
import './exchange-rate.css';


const ExchangeRates = ({rates,data,currencies,pGCV,setPiGCV,formarttoCurrency}) => {

    const[fiat,setfiat]=useState(0);
    /*const[pGCVinGHS,setPiGCVinGHS]=useState(pGCV*fiat);
    const[pGCVinNGN,setPiGCVinNGN]=useState(pGCV*fiat); */
    const[results,setResults]=useState(0);
    //const[fiatEnteredvalue,setEnteredfiatValue]=useState();
   
    const[tmprates]=useState(data.rates);
    const[tmpcurrencies]=useState(currencies.currencies);

    const[restructobj,setRestrucBoj]=useState(false);
   

  const onLocalfiatInputChange =(e)=>{

      var fiatvalue= e.target.value;
      var res=convert(fiatvalue,fiat);
      setResults(res.toFixed(8))
  }
  const convert =(fiatvalue,fiat)=>{
    return fiatvalue/fiat
  }

  const handleChange = (event) => {
    setfiat(event.target.value);
  };

  const SelectComponent =({fiat,rates})=>{
    return ( <FormControl sx={{ m: 1, minWidth: 220,alignItems:'center' }} size="small" >
    <InputLabel id="demo-select-small">Select Fiat currency</InputLabel>
    <Select
      labelId="currency-select-small"
      id="currency-select-small" 
      size="small"
      margin ="dense"
      fullWidth
      type="number"
      value={fiat} 
      label="Select Fiat currency"
      onChange={handleChange}
    >
      <MenuItem value={fiat}>
        <em>None</em>
      </MenuItem>
      {
       rates!== undefined ? 
        rates.map((rate,index)=>(
         <MenuItem key={index} value={(rate.value)*pGCV}>{`${rate.name} ${rate.country } `}</MenuItem>
         
      )):'' 
    }
     {/*  <MenuItem value={415.33*pGCV}>NGN</MenuItem>
      <MenuItem value={414159}>USD</MenuItem> */}

    </Select>
  </FormControl>)
  }
  useEffect(()=>{

    // eslint-disable-next-line no-unused-vars
    const restructureObject=(tmprates,tmpcurrencies)=>{
      var arrRates = [];
    for(var property in tmprates){

     var obj={"name": [property],
              "value":tmprates[property],
              "country":tmpcurrencies[property]
             } 
     arrRates.push(obj)
  }
  return arrRates
}
  if (!restructobj){
    //setRates(restructureObject(tmprates,tmpcurrencies));

  }  
  //console.log("rate : "+ JSON.stringify(rates))
return ()=>{
  setRestrucBoj(true)
}
  }, [restructobj, rates, tmprates, tmpcurrencies])

  return (
    <div className='pi-exchangerate'>
       
        <Grid container justifyContent='space-between' direction={'column'} spacing={1} /*  xs={12} sm={12} md={12} lg={12} */ >
           
       <Grid item xs={8} sm={8} md={8} lg={8}>
       <SelectComponent rates={rates} fiat={fiat}/>
                   
          </Grid>
                 <Typography variant='h6'>{`Pi Value  ${formarttoCurrency(fiat)}  `}</Typography>
        <Grid container  justifyContent='space-around'  direction={'column'}>
        <Grid item xs={8} sm={8} md={8} lg={8} className='inputs'>
        <TextField
          id="local-fiat"
          label={`Enter product amount`}
          type="number"
          size="small"
          placeholder=''
          margin ="dense"
          onChange={(e)=>{onLocalfiatInputChange(e)}}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={6}>
        <TextField
          id="pi-fiat"
          label="Pi "
          size="small"
          margin ="dense"
          type="number"
          value={results} 
          InputLabelProps={{
            shrink: true,
          }}
         
        />
       </Grid>
       
    
   
        </Grid>
           
         </Grid>
          
    </div>
  )
}

export default ExchangeRates
