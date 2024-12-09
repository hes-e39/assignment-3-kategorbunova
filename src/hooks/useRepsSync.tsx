import { useEffect } from 'react';

type UseRepsSyncProps = {
    isCurrent: boolean;
    isFinished: boolean;
    totalSeconds: number;
    secondsPassed: number;
    oneRoundSeconds: number;
    setRepsRemaining: (seconds: number) => void;
};

export const useRepsSync = ({ isCurrent, isFinished, totalSeconds, secondsPassed, oneRoundSeconds, setRepsRemaining }: UseRepsSyncProps) => {
    useEffect(() => {
        if (isCurrent) {
            const remainingReps = Math.ceil((totalSeconds - secondsPassed) / oneRoundSeconds);
            setRepsRemaining(remainingReps);
        }
        if (isFinished) {
            setRepsRemaining(0);
        }
    }, [oneRoundSeconds, secondsPassed, totalSeconds, isCurrent, isFinished, setRepsRemaining]);
};
