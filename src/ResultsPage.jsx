import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useFetch from "./useFetch";
import Loader from "./Loader";
import {getEmojiByCurrencyCode} from "country-currency-emoji-flags";
import { Twemoji } from 'react-emoji-render';

export default function ResultsPage() {

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
        <h2>ResultsPage</h2>
        {/* Once I finish functionality I want a Nav bar that says Home when your on Target Page */}
        <Link to="/">
            <img 
            src="/assets/back.svg"
            width="24px"
            height="24px" 
            alt="back arrow" 
            className="back"/>
        </Link>
        {loading ? (
      <Loader />
    ) : (
      <>
        <button id="swap-base-btn" onClick={()=>handleBaseChange()}>swap</button>
{/* here I am conditionally showing the conversion rate based on the swap state 
if it's false then it does the orginal base/target */}        
{swap ? (
  <>
    <h2> <Twemoji text={targetFlagEmoji} /> {targetCurrency} to <Twemoji text={baseFlagEmoji} /> {baseCurrency}</h2>
    <h2>1 {targetCurrency} = {Number((1/conversionRate).toFixed(4))} {baseCurrency}</h2>
    <p>{targetCurrency} to {baseCurrency} - Last updated {lastUpdatedTime}</p>
  </>
) : (
  <>
    <h2><Twemoji text={baseFlagEmoji} />{baseCurrency} to <Twemoji text={targetFlagEmoji} /> {targetCurrency}</h2>
    <h2>1 {baseCurrency} = {conversionRate} {targetCurrency}</h2>
    <p>{baseCurrency} to {targetCurrency} - Last updated {lastUpdatedTime}</p>
  </>
)}
      </>
    )}
    <button id="refresh-btn" onClick={()=>handleRefresh()}>Refresh</button>
        </>
    )
}