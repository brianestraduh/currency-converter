export default function CurrencyButton(props) {
    const { children, dataID, isActive, className,onClick, ...rest } = props;

    return (
        <button data-id={dataID} className={`${className} ${isActive ? 'active' : ''} ax-button`} onClick={onClick} {...rest}>
            {children}
        </button>   
    )
  }