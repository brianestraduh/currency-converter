import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useFetch from "./useFetch";
import Loader from "./Loader";
import {getEmojiByCurrencyCode} from "country-currency-emoji-flags";
import { Twemoji } from 'react-emoji-render';
import { useSelector } from "react-redux";

export default function ResultsPage() {

  const selectedCurrency = useSelector((state) => state.selectedCurrency);
  console.log(selectedCurrency)

    const { baseCurrCode, targetCurrCode } = useParams();


    const timeRef = useRef(null);
    const intervalRef = useRef(null);
    //define const for emoji flag
    const baseFlagEmoji = getEmojiByCurrencyCode(baseCurrCode) || '🏳️';
    const targetFlagEmoji = getEmojiByCurrencyCode(targetCurrCode) || '🏳️';

    const [baseCurrency, setBaseCurrency] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')
    const [conversionRate, setConversionRate] = useState('')
    const [lastUpdatedTime, setLastUpdatedTime] = useState('')
    const [swap, setSwap] = useState(false)
    const [refresh, setRefresh] = useState(false)

    //need to disable refresh button during api call
    const { get, loading } = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644/pair')
    useEffect(() => {
        get(`/${baseCurrCode}/${targetCurrCode}`)
        .then(data => {
            console.log(data)
            setBaseCurrency(data.base_code);
            setTargetCurrency(data.target_code);
            setConversionRate(data.conversion_rate);
            timeRef.current = Date.now();
            setLastUpdatedTime('now')
        })
    }, [refresh])

    // this useEffect is for the timer that updates the time since the last update

    useEffect(() => {
      //ensure the API call has been finished
      if (!timeRef.current) return;
      // clear the interval if it already exists
      if (intervalRef.current) clearInterval(intervalRef.current);
      // define elapsed time
      let elapsedTime = Date.now() - timeRef.current;
      // if elapsed time is greater than 24 hours, return so setLastUpdatedTime doesn't run
      if (elapsedTime > 86400000) return;
    // create intervals based on elapsed time
      const interval = elapsedTime < 60000 ? 60000 : elapsedTime < 300000 ? 60000 : elapsedTime < 1800000 ? 300000 : elapsedTime < 3600000 ? 600000 : elapsedTime < 86400000 ? 1800000 : 86400000;
    // set the intervalRef to the interval created above
      intervalRef.current = setInterval(() => {
        let elapsedTime = Date.now() - timeRef.current;
        setLastUpdatedTime(timeSince(elapsedTime));
      }, interval);
    
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [lastUpdatedTime]);

     function handleBaseChange() {
      setSwap(!swap);
      }

      function handleRefresh() {
       setRefresh(!refresh);
      }

      // function that takes in milliseconds and returns time in rtf format in either minutes or hours
      function timeSince(elapsedTime ) {
        if (elapsedTime < 60000) {
          return;
        } else if (elapsedTime < 3600000) {
          return `${Math.floor(elapsedTime / 60000)} minute(s) ago`;
        } else {
          return `${Math.floor(elapsedTime / 3600000)} hour(s) ago`;
        }
      }

    return (
        <>
        <div className="container">
          <h2 className="center-text company-logo header">Current<span className="blue-text">Currency</span> Converter</h2>
          <p className="currency-paragraph">Convert live foreign currency exchange rates</p>
          {loading ? (
        <Loader />
      ) : (
        <>
  {/* here I am conditionally showing the conversion rate based on the swap state 
  if it's false then it does the orginal base/target */}        
  {swap ? (
    <>
    <div className="result-card-flex">
      <div className="selected-currency-card"> 
        <Twemoji text={targetFlagEmoji} /> {targetCurrency}
      </div>
      <button id="swap-base-btn" onClick={()=>handleBaseChange()} className="ax-button rounded-swap-button">
        <img src="/assets/swap.svg" alt="swap button" height="24px" width="auto" />
      </button>
      <div className="selected-currency-card">
        <Twemoji text={baseFlagEmoji} /> {baseCurrency}
      </div>
    </div>
      <div className="center-text">
        <p>1 {targetCurrency} = {Number((1/conversionRate).toFixed(4))} {baseCurrency}</p>
      </div>
      <div className="results-update-flex">
        <p>{targetCurrency} to {baseCurrency} - Last updated {lastUpdatedTime}</p>
        <button id="refresh-btn" onClick={()=>handleRefresh()} className="rounded-button ax-button">Refresh</button>
      </div>
    </>
  ) : (
    <>
    <div className="result-card-flex">
      <div className="selected-currency-card"> 
        <Twemoji text={baseFlagEmoji} /> {baseCurrency}
      </div>
      <button id="swap-base-btn" onClick={()=>handleBaseChange()} className="ax-button rounded-swap-button">
        <img src="/assets/swap.svg" alt="swap button" height="24px" width="auto"/>
      </button>
      <div className="selected-currency-card">
        <Twemoji text={targetFlagEmoji} /> {targetCurrency}
      </div>
    </div>
    <div className="center-text">
      <p>1 {baseCurrency} = {conversionRate} {targetCurrency}</p>
    </div>
    <div className="results-update-flex">
      <p>{baseCurrency} to {targetCurrency} - Last updated {lastUpdatedTime}</p>
      <button id="refresh-btn" onClick={()=>handleRefresh()} className="rounded-button ax-button">Refresh
      </button>
    </div>
    </>
  )}
        </>
      )}
    </div>
        </>
    )
}