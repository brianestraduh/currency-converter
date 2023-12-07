import CurrencyButton from "./CurrencyButton.jsx";

export default function TargetCurrency(props) {

    const {details, onClick, isActive, disabled} = props;
    const code = details.currency[0];
    const name = details.currency[1];
    const isBaseSelected = details.activeBaseCurrency ;

return (
    <CurrencyButton dataID={code}
     isActive={isActive} 
     onClick={onClick}
    disabled={disabled || !isBaseSelected}>
    {code} {name}</CurrencyButton>
)
}