import CurrencyButton from "./CurrencyButton.jsx";
import {getEmojiByCurrencyCode} from "country-currency-emoji-flags";
import { Twemoji } from 'react-emoji-render';

export default function TargetCurrency(props) {

    const {details, onClick, isActive, disabled} = props;
    const code = details.currency[0];
    const name = details.currency[1];
    const isBaseSelected = details.activeBaseCurrency ;
    const flagEmoji = getEmojiByCurrencyCode(code) || '🏳️';

    return (
        <CurrencyButton dataID={code}
        className="currency-card"
         isActive={isActive} 
         onClick={onClick}
        disabled={disabled || isBaseSelected === null}>
        <div className="country-items">
            <div className="emoji-code-pair">
                <Twemoji text={flagEmoji} />         
                <span className="text-country-code">{code}</span>
            </div> 
            <span className="text-country-name">{name}</span>
        </div>      
        </CurrencyButton>
    )
}