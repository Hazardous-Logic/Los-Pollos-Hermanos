import { createContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children, deliveryTime }) => {
    const [timeUp, setTimeUp] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(deliveryTime);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(interval);
                setTimeUp(true);
            } else if (seconds === 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    return (
        <TimerContext.Provider value={{ timeUp, setTimeUp, seconds, setSeconds, minutes, setMinutes }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContext;