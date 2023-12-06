import Button from "./Button.jsx";

export default function TargetCurrency(props) {

    const {details, onClick, isActive} = props;
    const code = details[0];
    const name = details[1];

return (
    <Button dataID={code} isActive={isActive} onClick={onClick}>{code} {name}</Button>
)
}