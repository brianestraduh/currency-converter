import CurrencyButton from "./CurrencyButton.jsx";

export default function BaseCurrency(props) {

    const {details, onClick, isActive} = props;
    const code = details[0];
    const name = details[1];

return (
    <CurrencyButton dataID={code} isActive={isActive} onClick={onClick}>{code} {name}</CurrencyButton>
)
}