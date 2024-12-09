import { useEffect } from 'react';

type UseTimerSyncProps = {
    isCurrent: boolean;
    isFinished: boolean;
    totalSeconds: number;
    totalSecondsPassed: number;
    currentTimerIndex: number;
    timersArray: Array<{ totalSeconds: number }>;
    setSecondsPassed: (seconds: number) => void;
};

export const useTimerSync = ({ isCurrent, isFinished, totalSeconds, totalSecondsPassed, currentTimerIndex, timersArray, setSecondsPassed }: UseTimerSyncProps) => {
    useEffect(() => {
        const timerElapsedTime = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);

        if (isCurrent) {
            setSecondsPassed(Math.max(0, timerElapsedTime));
        }
        if (isFinished) {
            setSecondsPassed(Math.max(0, totalSeconds));
        }
    }, [totalSecondsPassed, currentTimerIndex, isCurrent, isFinished, totalSeconds, timersArray, setSecondsPassed]);
};
