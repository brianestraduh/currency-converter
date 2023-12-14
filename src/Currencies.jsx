import { useState, useEffect } from "react";
import useFetch from "./useFetch.js"
import BaseCurrency from "./BaseCurrency.jsx";
import TargetCurrency from "./TargetCurrency.jsx";
import TrackRateAnchor from "./TrackRateAnchor.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBaseCurrency, addTargetCurrency } from "./store.js";
export default function Currencies() {

    const [countryCurrency, setCountryCurrency] = useState([])
    const [activeBaseCurrency, setActiveBaseCurrency] = useState(null)
    const [activeTargetCurrency, setActiveTargetCurrency] = useState(null)
    const [trackRateActive, setTrackRate] = useState(false)

    const dispatch = useDispatch();

// Callback functions
const handleBaseCurrencyClick = (index) => {
    setActiveBaseCurrency(index+1);
    console.log(index); // Add this line
  };
  
  const handleTargetCurrencyClick = (index) => {
    setActiveTargetCurrency(index+1);
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

    const {get} = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644')
  
   useEffect(() => {
      get('/codes')
      .then(data => {
        console.log(data.supported_codes)
        setCountryCurrency(data.supported_codes)
      })
  }, [])

  const baseCurrencyCode = activeBaseCurrency !== null && countryCurrency[activeBaseCurrency] ? countryCurrency[activeBaseCurrency][0] : null;
  const targetCurrencyCode = activeTargetCurrency !== null && countryCurrency[activeTargetCurrency] ? countryCurrency[activeTargetCurrency][0] : null;

  return (
    <>
    <div className="container">
      <header>
        <h1 className="center-text">The safe and easy way to <span className="blue-text"><strong>exchange</strong></span> your <span className="blue-text"><strong>money</strong></span></h1>
      </header>
      <p className="currency-paragraph">{`You always get the best exchange rate with CurrentCurrency, whether you send, spend or convert money in dozens of currencies. But don\'t take our word for it.`}</p>
      <h2 className="select-currency">Select your base currency</h2>
      <div className="currency-grid">
          {countryCurrency.map((currency, index) => {
              return <BaseCurrency 
              key={index +1}
              details={currency}
              isActive={(index+1)===activeBaseCurrency}
              onClick={() => { 
                dispatch(addBaseCurrency(currency[1]));
                handleBaseCurrencyClick(index+1); 
                handleTrackRate(); }} />
          })}
      </div>
      <h2 className="select-currency">Select your target currency</h2>
      <div className="currency-grid">
          {countryCurrency.map((currency, index) => {
              return <TargetCurrency
              key={index + 1}
              details={{currency, activeBaseCurrency}}
              isActive={(index+1)=== activeTargetCurrency}
              disabled={(index+1)===activeBaseCurrency}
              onClick={() => { 
                dispatch(addTargetCurrency(currency[1]));
                handleTargetCurrencyClick(index +1); 
                handleTrackRate(); }} />
          })}
      </div>
  {trackRateActive ? (
    <Link to={`/${baseCurrencyCode}/${targetCurrencyCode}`}>
      <TrackRateAnchor></TrackRateAnchor>
    </Link>
  ) : (
    <span>
      <TrackRateAnchor className="track-rate-disabled" disabled></TrackRateAnchor>
    </span>
  )}
  </div>
    </>
  )
}