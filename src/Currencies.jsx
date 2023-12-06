import { useState, useEffect } from "react";
import useFetch from "./useFetch.js"
import BaseCurrency from "./BaseCurrency.jsx";
import TargetCurrency from "./TargetCurrency.jsx";
import TrackRateAnchor from "./TrackRateAnchor.jsx";
export default function Currencies() {

    const [countryCurrency, setCountryCurrency] = useState([])
    const [activeBaseCurrency, setActiveBaseCurrency] = useState('')
    const [activeTargetCurrency, setActiveTargetCurrency] = useState('')
    const [trackRateActive, setTrackRate] = useState(false)
    
// Callback functions
const handleBaseCurrencyClick = (index) => {
    setActiveBaseCurrency(index);
  };
  
  const handleTargetCurrencyClick = (index) => {
    setActiveTargetCurrency(index);
  };

//function to set track rate button to active if both base and target currencies are selected
useEffect(() => {
  handleTrackRate();
}, [activeBaseCurrency, activeTargetCurrency]);

const handleTrackRate = () => {
  if (activeBaseCurrency !== '' && activeTargetCurrency !== '') {
    setTrackRate(true);
  } else {
    setTrackRate(false);
  }
};

    const fetch = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644')
  
   useEffect(() => {
      fetch.get('/codes')
      .then(data => {
        console.log(data.supported_codes)
        setCountryCurrency(data.supported_codes)
      })
  }, [])

  return (
    <>
    <h2>Base Currencies</h2>
    <div id="base-currency-grid">
        {countryCurrency.map((currency, index) => {
            return <BaseCurrency 
            key={index}
            details={currency}
            isActive={index===activeBaseCurrency}
            onClick={() => { handleBaseCurrencyClick(index); handleTrackRate(); }} />
        })}
</div>
    <h2>Target Currencies</h2>
    <div id="target-currency-grid">
        {countryCurrency.map((currency, index) => {
            return <TargetCurrency
            key={index}
            details={currency}
            isActive={index=== activeTargetCurrency}
            onClick={() => { handleTargetCurrencyClick(index); handleTrackRate(); }} />
        })}
</div>
<div id="track-rate-btn">
    <TrackRateAnchor 
    disabled={!trackRateActive}
    >Track Rate</TrackRateAnchor>
</div>
    </>
  )
}