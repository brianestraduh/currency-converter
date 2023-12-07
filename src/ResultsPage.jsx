import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import Loader from "./Loader";

export default function ResultsPage() {

    const { baseCurrCode, targetCurrCode } = useParams();
    const [baseCurrency, setBaseCurrency] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')
    const [conversionRate, setConversionRate] = useState('')
    const [lastUpdatedTime, setLastUpdatedTime] = useState('')

    const { get, loading } = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644/pair')
    useEffect(() => {
        get(`/${baseCurrCode}/${targetCurrCode}`)
        .then(data => {
            console.log(data)
            setBaseCurrency(data.base_code);
            setTargetCurrency(data.target_code);
            setConversionRate(data.conversion_rate);
            setLastUpdatedTime(currentTimeInRTFFormat)
        })
    }, [])

    function getFormattedLastUpdatedTime(lastUpdatedTime) {
      const now = Date.now();
      const lastUpdated = new Date(lastUpdatedTime).getTime();
      const diffInMinutes = Math.round((now - lastUpdated) / 1000 / 60);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(-diffInMinutes, 'minute');
    } 

    const currentTimeInRTFFormat = getFormattedLastUpdatedTime(new Date());


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
        <h2>{baseCurrency} to {targetCurrency}</h2>
        <h2>1 {baseCurrency} = {conversionRate} {targetCurrency}</h2>
        <p>{baseCurrency} to {targetCurrency} - Last updated {lastUpdatedTime}</p>
      </>
    )}
        </>
    )
}