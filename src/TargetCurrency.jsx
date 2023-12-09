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
         isActive={isActive} 
         onClick={onClick}
        disabled={disabled || !isBaseSelected}>
        <Twemoji text={flagEmoji} /> {code} {name} 
        </CurrencyButton>
    )
}