import { useState, useEffect } from "react";
import useFetch from "./useFetch.js"
import BaseCurrency from "./BaseCurrency.jsx";
import TargetCurrency from "./TargetCurrency.jsx";
import TrackRateAnchor from "./TrackRateAnchor.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBaseCurrency, addTargetCurrency } from "./store.js";
export default function Currencies() {

  //state variables
    //state contains an array of currency codes and their corresponding name
    const [countryCurrency, setCountryCurrency] = useState([])
    //state contains the index of the selected base/target currency
    const [activeBaseCurrency, setActiveBaseCurrency] = useState(null)
    const [activeTargetCurrency, setActiveTargetCurrency] = useState(null)
    //state contains the boolean value of whether the track rate button is enabled or disabled
    const [trackRateActive, setTrackRate] = useState(false)
  // initalize dispatch in order to save base and target currencies to redux store
    const dispatch = useDispatch();

// handle state changes when base and target currencies are selected
const handleBaseCurrencyClick = (index) => {
    setActiveBaseCurrency(index);
  };
  
  const handleTargetCurrencyClick = (index) => {
    setActiveTargetCurrency(index);
  };

  // enable or keeep track rate button disabled
  const handleTrackRate = () => {
    if (activeBaseCurrency !== '' && activeTargetCurrency !== '') {
      setTrackRate(true);
    } else {
      setTrackRate(false);
    }
  };
  

// useEffect to handle state changes when base and target currencies are selected to see if track rate button should be enabled or disabled
useEffect(() => {
  handleTrackRate();
}, [activeBaseCurrency, activeTargetCurrency]);


  const {get} = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644')
 
// fetch supported country codes when this component mounts  
useEffect(() => {
  get('/codes')
  .then(data => {
    setCountryCurrency(data.supported_codes)
      })
  }, [])

  // the selected base and target currency codes, and will be used to create the url path for the track rate button
  const selectedBaseCurrencyCode = activeBaseCurrency !== null && countryCurrency[activeBaseCurrency] ? countryCurrency[activeBaseCurrency][0] : null;
  const selectedTargetCurrencyCode = activeTargetCurrency !== null && countryCurrency[activeTargetCurrency] ? countryCurrency[activeTargetCurrency][0] : null;

  return (
    <>
    <div className="container">
      <header>
        <h1 className="center-text">The safe and easy way to <span className="blue-text"><strong>exchange</strong></span> your <span className="blue-text"><strong>money</strong></span></h1>
      </header>
      <p className="currency-paragraph">{`You always get the best exchange rate with CurrentCurrency, whether you send, spend or convert money in dozens of currencies. But don\'t take our word for it.`}</p>
      <h2 className="select-currency">Select your base currency</h2>
      <div className="currency-grid">
        {/* map through the countryCurrency array and render a BaseCurrency button component for each currency code and name */}
          {countryCurrency.map((currency, index) => {
              return <BaseCurrency 
              key={index}
              details={currency}
              isActive={(index)===activeBaseCurrency}
              onClick={() => { 
                dispatch(addBaseCurrency(currency[1]));
                handleBaseCurrencyClick(index); 
                handleTrackRate(); }} />
          })}
      </div>
      <h2 className="select-currency">Select your target currency</h2>
      <div className="currency-grid">
        {/* map through the countryCurrency array and render a TargetCurrency button component for each currency code and name */}
          {countryCurrency.map((currency, index) => {
              return <TargetCurrency
              key={index}
              details={currency}
              isActive={(index)=== activeTargetCurrency}
              disabled={(index)===activeBaseCurrency}
              onClick={() => { 
                dispatch(addTargetCurrency(currency[1]));
                handleTargetCurrencyClick(index); 
                handleTrackRate(); }} />
          })}
      </div>
  {trackRateActive ? (
    <Link to={`/${selectedBaseCurrencyCode}/${selectedTargetCurrencyCode}`}>
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