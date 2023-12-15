import CurrencyButton from "./CurrencyButton.jsx";
import { getEmojiByCurrencyCode } from "country-currency-emoji-flags";
import { Twemoji } from "react-emoji-render";

export default function BaseCurrency(props) {
  const { details, onClick, isActive } = props;
  const code = details[0];
  const name = details[1];
  const flagEmoji = getEmojiByCurrencyCode(code) || "🏳️";

  return (
    <CurrencyButton
      className="currency-card"
      dataID={code}
      isActive={isActive}
      onClick={onClick}
    >
      <div className="country-items">
        <div className="emoji-code-pair">
          <Twemoji text={flagEmoji} />
          <span className="text-country-code">{code}</span>
        </div>
        <span className="text-country-name">{name}</span>
      </div>
    </CurrencyButton>
  );
}
