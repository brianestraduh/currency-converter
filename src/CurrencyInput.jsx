import { useState, useEffect } from 'react';

export default function CurrencyInput({ onValueChange }) {
    const [value, setValue] = useState(1.00);

    useEffect(() => {
        onValueChange(value);
    }, [value, onValueChange]);

    const handleChange = (event) => {
        const value = event.target.value;
        const formattedValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
        setValue(formattedValue);
    };

    return (
        <div>
            <input type="number" value={value} onChange={handleChange} />
        </div>
    )
}