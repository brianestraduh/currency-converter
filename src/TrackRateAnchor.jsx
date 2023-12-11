export default function TrackRateAnchor(props) {
    const { children, className, disabled, ...rest } = props;
    const classes = `${className} ${disabled ? 'disabled' : ''}`;
    return (
        <div className="container">
            <div className="track-rate-grid">
                <a  className={`${classes} rounded-button ax-button btn `} {...rest} disabled={disabled}>
                    {children}Track exchange rate
                </a> 
            </div>
        </div>   
    )

}
