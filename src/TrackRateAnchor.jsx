export default function TrackRateAnchor(props) {
    const { children, className, disabled, ...rest } = props;
    const classes = `${className} ${disabled ? 'disabled' : ''}`;
    return (
        <a  className={classes} {...rest} disabled={disabled}>
            {children}
        </a>   
    )

}
