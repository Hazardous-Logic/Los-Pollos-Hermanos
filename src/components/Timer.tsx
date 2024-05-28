import { useState, useEffect } from "react";

export function Timer({ deliveryTime }: { deliveryTime: number }) {

    const [timeUp, settimeUp] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(deliveryTime);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(interval);
                settimeUp(true);
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

    //radius
    const size = 210;
    const radius = 85;
    const totalSeconds = minutes * 60 + seconds;
    const progress = (totalSeconds / (deliveryTime * 60)) * 100;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (circumference * progress) / 100 ;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
      <div className="text-center items-center flex flex-col my-10">
        {timeUp ? (
          <div className="container mx-auto my-10 rounded-xl shadow-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
            <p className="font-semibold text-xl mb-5">
              Your meal has arrived! 🥳
            </p>
            <p className="text-gray-700">
              Delivery Time: {new Date().toLocaleString()}
            </p>
          </div>
        ) : (
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`bg-yellow-300 animate-bounce-short rounded-full shadow-xl`}
          >
            <circle
              className="stroke-current text-gray-200"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth="10%"
              fill="transparent"
            />
            <circle
              className="stroke-current text-red-700"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth="10%"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              //transform={`rotate(-90 ${size/2} ${size/2})`}
            />
            <text
              x="50%"
              y="50%"
              dy="0.3em"
              textAnchor="middle"
              className="text-3xl font-bold tracking-wider text-red-700"
            >
              {formattedTime}
            </text>
          </svg>
        )}
      </div>
    );
}
