import { Grid, Typography,Select,FormControl,InputLabel,MenuItem,TextField} from '@mui/material';
import React,{useState,useEffect} from 'react';
import './exchange-rate.css';


const ExchangeRates = ({/* rates, */data,currencies,pGCV,setPiGCV,formarttoCurrency}) => {

    /*const[pGCVinGHS,setPiGCVinGHS]=useState(pGCV*fiat);
    const[pGCVinNGN,setPiGCVinNGN]=useState(pGCV*fiat); */

    const[fiat,setfiat]=useState(0);
    const[tmprates]=useState(data.rates);
    const[tmpcurrencies]=useState(currencies.currencies);
    const[productValue,setProductValue]=useState()
    const[fiatLabel,setFiatLabel]=useState('')
    const[restructobj,setRestrucBoj]=useState(false);
     const[results,setResults]=useState(0);
     const[rates,setRates]=useState([]);


  const onLocalfiatInputChange =(e)=>{

      var productvalue= e.target.value;
          setProductValue(productvalue);
      var res=convert(productvalue,fiat);
      setResults(res.toFixed(8))
  }
  const convert =(productvalue,fiat)=>{
    return productvalue/fiat
  }
 
  const handleChange = (event) => {   
      setfiat(event.target.value);
      setFiatLabel(event.target.name);
      console.log(productValue)
 
   if(productValue !== undefined){ 
    var res=convert(productValue,fiat);
    setResults(res.toFixed(8))
  }
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
      name={fiatLabel}
      label="Select currency"
      onChange={handleChange}
    >
      <MenuItem value={fiat}>
        <em>None</em>
      </MenuItem>
      {
       rates!== undefined ? 
        rates.map((rate,index)=>(
         <MenuItem key={index} name={rate.name}  value={(rate.value)*pGCV}>{`${rate.name} ${rate.country } `}</MenuItem>
         
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
  setRates(restructureObject(tmprates,tmpcurrencies));

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
                 <Typography variant='h6'>{`${fiatLabel} Value  ${formarttoCurrency(fiat)}  `}</Typography>
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
