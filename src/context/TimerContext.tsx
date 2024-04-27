import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TimerContextType = {
  startTimer: (duration: number) => void;
  stopTimer: () => void;
  timeUp: boolean;
  formattedTime: string;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

type TimerProviderProps = {
  children: ReactNode;
};

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

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

  const startTimer = (duration: number) => {
    setTimeUp(false);
    setMinutes(duration);
    setSeconds(0);
  };

  const stopTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setTimeUp(true);
  };

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <TimerContext.Provider value={{ startTimer, stopTimer, timeUp, formattedTime }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the timer context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
