import { useContext, useEffect } from 'react';
import { TimersContext } from '../views/TimerProvider';

const useTimeLocalStorage = () => {
    const { totalSecondsPassed } = useContext(TimersContext);

    // const [totalSecondsPassedLocal, setTotalSecondsPassedLocal] = useState(() => {
    //     const storageValue = localStorage.getItem('totalSecondsPassedLocal');
    //     return storageValue ? Number.parseInt(storageValue, 10) : 0;
    // });

    useEffect(() => {
        localStorage.setItem('totalSecondsPassedLocal', totalSecondsPassed.toString());
    }, [totalSecondsPassed]);

    return [totalSecondsPassed] as const;
};

export default useTimeLocalStorage;
