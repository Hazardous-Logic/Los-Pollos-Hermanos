import React, { useState, useEffect } from "react";

export function Timer({ deliveryTime }: { deliveryTime: number }) {
    // const initialSeconds = parseInt(localStorage.getItem("timerSeconds") || "0", 10);
    // const initialMinutes = parseInt(localStorage.getItem("timerMinutes") || deliveryTime.toString(), 10);

    // const [seconds, setSeconds] = useState(initialSeconds);
    // const [minutes, setMinutes] = useState(initialMinutes);
        const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(deliveryTime);

    

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(interval);
                // Handle timer expiry here
            } else if (seconds === 0) {
                setMinutes(prevMinutes => prevMinutes - 1);
                setSeconds(59);
            } else {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    // Save timer state to localStorage
    // useEffect(() => {
    //     localStorage.setItem("timerSeconds", seconds.toString());
    //     localStorage.setItem("timerMinutes", minutes.toString());
    // }, [seconds, minutes]);

    // Calculate total remaining seconds
    const totalSeconds = minutes * 60 + seconds;

    // Calculate progress percentage
    const progress = ((deliveryTime * 60 - totalSeconds) / (deliveryTime * 60)) * 100;

    // Calculate stroke-dasharray
    const dashArray = Math.PI * 80;
    const dashOffset = dashArray - (dashArray * progress) / 100;

    // Format the time to display with leading zeros
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="bg-yellow-300 w-48 h-48 rounded-full relative">
            {/* Circular progress bar */}
            <svg className="absolute" width="100%" height="100%">
                <circle
                    className="stroke-current text-gray-200"
                    cx="50%"
                    cy="50%"
                    r="40%"
                    strokeWidth="10%"
                    fill="transparent"
                />
                <circle
                    className="stroke-current text-red-700"
                    cx="50%"
                    cy="50%"
                    r="40%"
                    strokeWidth="10%"
                    fill="transparent"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    // transform="rotate(90 50 50)"
                />
                <text x="50%" y="50%">{formattedTime}</text>

            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
                {formattedTime}
            </div>
        </div>
    );
}
