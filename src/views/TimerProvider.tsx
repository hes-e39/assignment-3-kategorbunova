import { type ReactNode, createContext, useEffect, useState } from 'react';
import { STATUS } from '../utils/constants';
import type { StatusType } from '../utils/constants';
import { TotalSeconds } from '../utils/helpers';
import { InputsValidation } from '../utils/helpers';

export type Timer = {
    title: string;
    totalSeconds: number;
    timeMinInput: string;
    timeSecInput: string;
    timeMinInputRest: string;
    timeSecInputRest: string;
    repInput: string;
    comments: string;
};

type TimerTitle = 'Stopwatch' | 'Countdown' | 'XY' | 'Tabata';

export type TimersContextType = {
    timersArray: Timer[];
    timerInputs: typeof initialTimerInputs;
    addTimer: (title: TimerTitle) => void;
    handleInputChange: (title: TimerTitle, field: string, value: string) => void;
    removeLastTimer: () => void;
    resetTimers: () => void;
    resetAll: boolean;
    removeAllTimers: () => void;
    totalSecondsPassed: number;
    currentTimerIndex: number;
    totalQueueSeconds: number;
    statusQueue: StatusType;
    setTotalSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
    setCurrentTimerIndex: (index: number) => void;
    setStatusQueue: (status: StatusType) => void;
    isSaved: boolean;
    setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
    showAddView: React.Dispatch<React.SetStateAction<boolean>>;
    addTimerView: boolean;
    editTimer: (index: number) => void;
    handleSaveOrAdd: () => void;
    editingIndex: any;
    selectedTimer: any;
    setSelectedTimer: any;
    moveTimerUp: (index: number) => void;
    moveTimerDown: (index: number) => void;
    //totalSecondsPassedLocal: number;
};

const initialTimerInputs = {
    Stopwatch: { timeMinInput: '', timeSecInput: '', comments: '' },
    Countdown: { timeMinInput: '', timeSecInput: '', comments: '' },
    XY: { timeMinInput: '', timeSecInput: '', repInput: '', comments: '' },
    Tabata: { timeMinInputRest: '', timeSecInputRest: '', timeMinInput: '', timeSecInput: '', repInput: '', comments: '' },
};

export const TimersContext = createContext<TimersContextType>({
    timersArray: [],
    timerInputs: initialTimerInputs,
    addTimer: () => {},
    handleInputChange: () => {},
    removeLastTimer: () => {},
    resetTimers: () => {},
    resetAll: false,
    removeAllTimers: () => {},
    totalSecondsPassed: 0,
    currentTimerIndex: 0,
    totalQueueSeconds: 0,
    statusQueue: STATUS.INITIAL,
    setTotalSecondsPassed: () => {},
    setCurrentTimerIndex: () => {},
    setStatusQueue: () => {},
    //totalSecondsPassedLocal: 0,
    isSaved: false,
    setIsSaved: () => {},
    showAddView: () => {},
    addTimerView: false,
    editTimer: () => {},
    handleSaveOrAdd: () => {},
    editingIndex: null,
    selectedTimer: null,
    setSelectedTimer: () => {},
    moveTimerUp: () => {},
    moveTimerDown: () => {},
});

export const TimersProvider = ({ children }: { children: ReactNode }) => {
    const [timersArray, setTimersArray] = useState<Timer[]>([]);
    const [timerInputs, setTimerInputs] = useState(initialTimerInputs);
    const [currentTimerIndex, setCurrentTimerIndex] = useState<number>(() => {
        const savedIndex = localStorage.getItem('indexLocal');
        return savedIndex ? Number(savedIndex) : 0;
    });
    //const [totalSecondsPassed, setTotalSecondsPassed] = useState<number>(0);
    const [isSaved, setIsSaved] = useState(false);

    const [totalSecondsPassed, setTotalSecondsPassed] = useState<number>(() => {
        const savedValue = localStorage.getItem('totalSecondsPassedLocal');
        return savedValue ? Number(savedValue) : 0;
    });

    const [statusQueue, setStatusQueue] = useState<StatusType>(STATUS.INITIAL);

    const handleInputChange = (title: TimerTitle, field: string, value: string) => {
        setTimerInputs(prevInputs => ({ ...prevInputs, [title]: { ...prevInputs[title], [field]: value } }));
    };

    // const handleEditTimer = (index: number) => {
    //     const timerToEdit = timersArray[index];
    //     setSelectedTimer(timerToEdit.title); // Set the timer type
    //     //setTimerInputs(timerToEdit.inputs); // Prepopulate fields with the selected timer's inputs
    //     setEditingIndex(index); // Mark which timer is being edited
    //     setAddTimerView(true); // Show the AddTimerView
    // };

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [selectedTimer, setSelectedTimer] = useState<TimerTitle | ''>('');

    const handleSaveOrAdd = () => {
        if (editingIndex !== null) {
            // Edit the timer
            const updatedTimer = {
                ...timersArray[editingIndex],
                ...timerInputs[selectedTimer],
                title: selectedTimer,
                totalSeconds: TotalSeconds(
                    timerInputs[selectedTimer]?.timeMinInput,
                    timerInputs[selectedTimer]?.timeSecInput,
                    timerInputs[selectedTimer]?.timeMinInputRest,
                    timerInputs[selectedTimer]?.timeSecInputRest,
                    timerInputs[selectedTimer]?.repInput,
                ),
            };

            setTimersArray(prevArray => {
                const updatedArray = [...prevArray];
                updatedArray[editingIndex] = updatedTimer;
                return updatedArray;
            });

            setEditingIndex(null); // Clear editing state
        } else if (selectedTimer) {
            // Add a new timer
            addTimer(selectedTimer);
        }

        // Reset inputs and hide Add Timer view
        setSelectedTimer('');
        setTimerInputs(initialTimerInputs);
        setAddTimerView(false);
    };

    const addTimer = (title: TimerTitle) => {
        const timer = timerInputs[title] as {
            timeMinInput: string;
            timeSecInput: string;
            timeMinInputRest?: string;
            timeSecInputRest?: string;
            repInput?: string;
            comments: string;
        };

        const { timeMinInput = '0', timeSecInput = '0', timeMinInputRest = '0', timeSecInputRest = '0', repInput = '1', comments = '' } = timer;
        const totalSeconds = TotalSeconds(timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, repInput);

        if (InputsValidation(totalSeconds) === false) {
            alert('Please enter a valid time.');
        } else {
            setTimersArray(prevArray => [...prevArray, { title, totalSeconds, repInput, timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, comments }]);
            setAddTimerView(false);
        }
    };

    const editTimer = (index: number) => {
        const timerToEdit = timersArray[index];
        setSelectedTimer(timerToEdit.title as TimerTitle); // Preselect the timer type
        setTimerInputs(prevInputs => ({
            ...prevInputs,
            [timerToEdit.title]: {
                timeMinInput: timerToEdit.timeMinInput,
                timeSecInput: timerToEdit.timeSecInput,
                timeMinInputRest: timerToEdit.timeMinInputRest || '',
                timeSecInputRest: timerToEdit.timeSecInputRest || '',
                repInput: timerToEdit.repInput || '',
                comments: timerToEdit.comments,
            },
        }));
        setEditingIndex(index); // Track the timer being edited
        setAddTimerView(true); // Show the Add Timer view
    };

    const removeLastTimer = () => {
        setTimersArray(prevArray => {
            // edge case for removing the first timer
            if (prevArray.length === 1 && totalSecondsPassed === 0) {
                return prevArray.slice(0, -1);
            } else if (prevArray.length - 1 > currentTimerIndex) {
                return prevArray.slice(0, -1);
            }
            alert('Cannot undo a timer that has already started. Please remove all.');
            return prevArray;
        });
    };

    const removeAllTimers = () => {
        setTimersArray([]);
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
    };

    const [resetAll, setResetAll] = useState(false);

    const resetTimers = () => {
        setResetAll(true);
        setTimeout(() => setResetAll(false), 0);
    };

    const totalQueueSeconds = timersArray.reduce((total, timer) => {
        const totalSeconds =
            ((Number(timer.timeMinInput) || 0) * 60 + (Number(timer.timeSecInput) || 0) + (Number(timer.timeMinInputRest) || 0) * 60 + (Number(timer.timeSecInputRest) || 0)) *
            (Number(timer.repInput) || 1);

        return total + totalSeconds;
    }, 0);

    const [addTimerView, setAddTimerView] = useState(false);

    const showAddView = () => {
        if (addTimerView) setAddTimerView(false);
        else setAddTimerView(true);
    };

    const moveTimerUp = (index: number) => {
        setTimersArray(prev => {
            if (index === 0) return prev;
            const newTimersArray = [...prev];
            [newTimersArray[index - 1], newTimersArray[index]] = [newTimersArray[index], newTimersArray[index - 1]];
            return newTimersArray;
        });
    };

    const moveTimerDown = (index: number) => {
        setTimersArray(prev => {
            if (index === prev.length - 1) return prev;
            const newTimersArray = [...prev];
            [newTimersArray[index], newTimersArray[index + 1]] = [newTimersArray[index + 1], newTimersArray[index]];
            return newTimersArray;
        });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const timersParam = urlParams.get('timers');
        if (timersParam) {
            try {
                const parsedTimers = JSON.parse(decodeURIComponent(timersParam));
                setTimersArray(parsedTimers);
            } catch (error) {
                console.error('Failed to parse timers from URL:', error);
            }
        }
    }, []);

    //const useTimeLocalStorage = () => {
    useEffect(() => {
        const updateLocalStorage = () => {
            localStorage.setItem('totalSecondsPassedLocal', totalSecondsPassed.toString());
        };
        updateLocalStorage();
    }, [totalSecondsPassed]);

    useEffect(() => {
        localStorage.setItem('indexLocal', currentTimerIndex.toString());
    }, [currentTimerIndex]);

    return (
        <TimersContext.Provider
            value={{
                timersArray,
                addTimer,
                timerInputs,
                handleInputChange,
                removeLastTimer,
                removeAllTimers,
                resetTimers,
                resetAll,
                totalSecondsPassed,
                totalQueueSeconds,
                currentTimerIndex,
                statusQueue,
                setTotalSecondsPassed,
                setCurrentTimerIndex,
                setStatusQueue,
                isSaved,
                setIsSaved,
                showAddView,
                addTimerView,
                editTimer,
                handleSaveOrAdd,
                editingIndex,
                selectedTimer,
                setSelectedTimer,
                moveTimerUp,
                moveTimerDown,
            }}
        >
            {children}
        </TimersContext.Provider>
    );
};

export default TimersProvider;
