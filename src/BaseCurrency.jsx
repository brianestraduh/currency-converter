import CurrencyButton from "./CurrencyButton.jsx";
import {getEmojiByCurrencyCode} from "country-currency-emoji-flags";
import { Twemoji } from 'react-emoji-render';

export default function BaseCurrency(props) {

    const {details, onClick, isActive} = props;
    const code = details[0];
    const name = details[1];
    const flagEmoji = getEmojiByCurrencyCode(code) || '🏳️';

    return (
        <CurrencyButton dataID={code} isActive={isActive} onClick={onClick}>
            <Twemoji text={flagEmoji} /> {code} {name}
        </CurrencyButton>
    )
}