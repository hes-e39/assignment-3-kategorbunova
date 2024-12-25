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
    showAddView: () => void;
    hideAddView: () => void;
    addTimerView: boolean;
    editTimer: (index: number) => void;
    handleSaveOrAdd: () => void;
    editingIndex: number | null;
    selectedTimer: TimerTitle | '';
    setSelectedTimer: React.Dispatch<React.SetStateAction<TimerTitle | ''>>;
    moveTimerUp: (index: number) => void;
    moveTimerDown: (index: number) => void;
    setTimersArray: React.Dispatch<React.SetStateAction<Timer[]>>;
    setIsWorkoutComplete: React.Dispatch<React.SetStateAction<boolean>>;
    isWorkoutComplete: boolean;
    workoutsCompleted: { title: string; timers: Timer[]; totalQueueSeconds: number }[];
    setWorkoutsCompleted: React.Dispatch<React.SetStateAction<{ title: string; timers: Timer[]; totalQueueSeconds: number }[]>>;
    isEditingWorkout: boolean;
    setIsEditingWorkout: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    showConfetti: boolean;
    addWorkoutToHistory: (workout: Timer[], title: string) => void;
    workoutTitle: string;
    setWorkoutTitle: (title: string) => void;
    isEditingTitle: boolean;
    setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>;
    handleTitleChange: (title: string) => void;
    saveTimersToURL: () => void;
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
    isSaved: false,
    setIsSaved: () => {},
    showAddView: () => {},
    hideAddView: () => {},
    addTimerView: false,
    editTimer: () => {},
    handleSaveOrAdd: () => {},
    editingIndex: null,
    selectedTimer: '',
    setSelectedTimer: () => {},
    moveTimerUp: () => {},
    moveTimerDown: () => {},
    setTimersArray: () => {},
    setIsWorkoutComplete: () => {},
    isWorkoutComplete: false,
    workoutsCompleted: [],
    setWorkoutsCompleted: () => {},
    isEditingWorkout: false,
    setIsEditingWorkout: () => {},
    error: null,
    setError: () => {},
    showConfetti: false,
    addWorkoutToHistory: () => {},
    workoutTitle: 'Your Workout',
    setWorkoutTitle: () => {},
    isEditingTitle: false,
    setIsEditingTitle: () => {},
    handleTitleChange: () => {},
    saveTimersToURL: () => {},
});

export const TimersProvider = ({ children }: { children: ReactNode }) => {
    // INITIALIZING CONSTS

    //consts that refer to timer logic
    const [timersArray, setTimersArray] = useState<Timer[]>([]);
    const [timerInputs, setTimerInputs] = useState(initialTimerInputs);
    const [statusQueue, setStatusQueue] = useState<StatusType>(STATUS.INITIAL);

    //local storage consts
    const [currentTimerIndex, setCurrentTimerIndex] = useState<number>(() => {
        const savedIndex = localStorage.getItem('indexLocal');
        return savedIndex ? Number(savedIndex) : 0;
    });
    const [totalSecondsPassed, setTotalSecondsPassed] = useState<number>(() => {
        const savedValue = localStorage.getItem('totalSecondsPassedLocal');
        return savedValue ? Number(savedValue) : 0;
    });
    const [workoutsCompleted, setWorkoutsCompleted] = useState<{ title: string; timers: Timer[]; totalQueueSeconds: number }[]>(() => {
        const savedWorkouts = localStorage.getItem('workoutsCompleted');
        return savedWorkouts ? JSON.parse(savedWorkouts) : [];
    });
    const [workoutTitle, setWorkoutTitle] = useState<string>(() => {
        const savedWorkoutTitle = localStorage.getItem('workoutTitle');
        return savedWorkoutTitle ? savedWorkoutTitle : 'Your Workout';
    });

    //consts for editing mode
    const [isEditingWorkout, setIsEditingWorkout] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [selectedTimer, setSelectedTimer] = useState<TimerTitle | ''>('');
    const [isSaved, setIsSaved] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [resetAll, setResetAll] = useState(false);
    const [addTimerView, setAddTimerView] = useState(false);

    //consts for finished workout
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    //error catching
    const [error, setError] = useState<string | null>(null);

    //FUNCTIONS FOR TIMER LOGIC

    const totalQueueSeconds = timersArray.reduce((total, timer) => {
        const totalSeconds =
            ((Number(timer.timeMinInput) || 0) * 60 + (Number(timer.timeSecInput) || 0) + (Number(timer.timeMinInputRest) || 0) * 60 + (Number(timer.timeSecInputRest) || 0)) *
            (Number(timer.repInput) || 1);

        return total + totalSeconds;
    }, 0);

    //functions for editing
    const handleInputChange = (title: TimerTitle, field: string, value: string) => {
        setTimerInputs(prevInputs => ({ ...prevInputs, [title]: { ...prevInputs[title], [field]: value } }));
    };

    const handleTitleChange = (title: string) => {
        setWorkoutTitle(title);
    };

    const handleSaveOrAdd = () => {
        setIsSaved(false);
        setAddTimerView(false);
        if (editingIndex !== null && selectedTimer && selectedTimer in timerInputs) {
            const selectedInputs = timerInputs[selectedTimer];

            const updatedTimer = {
                ...timersArray[editingIndex],
                ...timerInputs[selectedTimer],
                title: selectedTimer,
                totalSeconds: TotalSeconds(
                    timerInputs[selectedTimer]?.timeMinInput,
                    timerInputs[selectedTimer]?.timeSecInput,
                    'timeMinInputRest' in selectedInputs ? selectedInputs.timeMinInputRest : '0',
                    'timeSecInputRest' in selectedInputs ? selectedInputs.timeSecInputRest : '0',
                    'repInput' in selectedInputs ? selectedInputs.repInput : '1',
                ),
            };

            setTimersArray(prevArray => {
                const updatedArray = [...prevArray];
                updatedArray[editingIndex] = updatedTimer;
                return updatedArray;
            });

            setEditingIndex(null);
        } else if (selectedTimer && selectedTimer in timerInputs) {
            addTimer(selectedTimer);
        }

        setSelectedTimer('');
        setTimerInputs(initialTimerInputs);
    };

    const addTimer = (title: TimerTitle) => {
        const timer = timerInputs[title] as {
            timeMinInput: string;
            timeSecInput: string;
            timeMinInputRest?: string;
            timeSecInputRest?: string;
            repInput?: string;
            comments?: string;
        };

        const { timeMinInput = '0', timeSecInput = '0', timeMinInputRest = '0', timeSecInputRest = '0', repInput = '1', comments = '' } = timer;
        const totalSeconds = TotalSeconds(timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, repInput);

        if (InputsValidation(totalSeconds) === false) {
            setError('Please enter a valid time.');
            return;
        } else if ((title === 'XY' || title === 'Tabata') && repInput === '') {
            setError('Please enter repetitions for this timer.');
            return;
        } else if (title === 'Tabata' && Number(timeSecInputRest) + Number(timeMinInputRest) === 0) {
            setError('Please enter rest periods for this timer.');
            return;
        } else {
            setError(null);
            setTimersArray(prevArray => [...prevArray, { title, totalSeconds, repInput, timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, comments }]);
            setAddTimerView(false);
            setIsEditingWorkout(true);
            setIsSaved(false);
        }
    };

    const editTimer = (index: number) => {
        const timerToEdit = timersArray[index];
        setSelectedTimer(timerToEdit.title as TimerTitle);
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
        setEditingIndex(index);
        setAddTimerView(true);
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

    const resetTimers = () => {
        setResetAll(true);
        setTimeout(() => setResetAll(false), 0);
    };

    const showAddView = () => {
        if (addTimerView) {
            setAddTimerView(false);
            setSelectedTimer('');
            setTimerInputs(initialTimerInputs);
            setEditingIndex(null);
        } else setAddTimerView(true);
    };
    const hideAddView = () => {
        setAddTimerView(false);
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

    const addWorkoutToHistory = (workout: Timer[]) => {
        const totalQueueSeconds = workout.reduce((total, timer) => total + timer.totalSeconds, 0);

        const workoutWithTitle = { totalQueueSeconds, title: workoutTitle, timers: workout };

        setWorkoutsCompleted(prev => {
            const updatedWorkouts = [...prev, workoutWithTitle];
            localStorage.setItem('workoutsCompleted', JSON.stringify(updatedWorkouts));
            return updatedWorkouts;
        });
    };

    const saveTimersToURL = () => {
        const encodedTimers = encodeURIComponent(JSON.stringify(timersArray));
        const newUrl = `${window.location.origin}${window.location.pathname}?timers=${encodedTimers}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        setIsSaved(true);
        setIsEditingWorkout(false);
        setIsEditingTitle(false);
    };

    //ALL USEEFFECTS

    //updating local storage values
    useEffect(() => {
        const savedTitle = localStorage.getItem('workoutTitle');
        if (savedTitle) {
            setWorkoutTitle(savedTitle);
        }
    }, []);

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

    useEffect(() => {
        const updateLocalStorage = () => {
            localStorage.setItem('totalSecondsPassedLocal', totalSecondsPassed.toString());
        };
        updateLocalStorage();
    }, [totalSecondsPassed]);

    useEffect(() => {
        localStorage.setItem('indexLocal', currentTimerIndex.toString());
    }, [currentTimerIndex]);

    useEffect(() => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workoutsCompleted') || '[]');
        setWorkoutsCompleted(savedWorkouts);
    }, []);

    useEffect(() => {
        if (totalQueueSeconds > 0 && totalSecondsPassed === totalQueueSeconds && !isWorkoutComplete && timersArray.length > 0) {
            const completedWorkout = {
                title: workoutTitle,
                timers: [...timersArray],
                totalQueueSeconds: totalQueueSeconds,
            };

            const updatedWorkouts = [...workoutsCompleted, completedWorkout];

            setWorkoutsCompleted(updatedWorkouts);
            setIsWorkoutComplete(true);

            localStorage.setItem('workoutsCompleted', JSON.stringify(updatedWorkouts));
        }
    }, [totalQueueSeconds, totalSecondsPassed, workoutsCompleted, isWorkoutComplete, timersArray, workoutTitle]);

    //updating workout completion state (and starting a new workout)

    useEffect(() => {
        if (totalQueueSeconds === totalSecondsPassed && timersArray.length > 0) {
            setStatusQueue(STATUS.STOPPED);
            setShowConfetti(true);
            setIsWorkoutComplete(true);
            setTimeout(() => {
                setShowConfetti(false);
            }, 7000);
        }
    }, [totalSecondsPassed, totalQueueSeconds, timersArray.length]);

    useEffect(() => {
        if (totalSecondsPassed === 0) {
            setIsWorkoutComplete(false);
        }
    }, [totalSecondsPassed]);

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
                hideAddView,
                addTimerView,
                editTimer,
                handleSaveOrAdd,
                editingIndex,
                selectedTimer,
                setSelectedTimer,
                moveTimerUp,
                moveTimerDown,
                setTimersArray,
                setIsWorkoutComplete,
                isWorkoutComplete,
                workoutsCompleted,
                setWorkoutsCompleted,
                isEditingWorkout,
                setIsEditingWorkout,
                error,
                setError,
                showConfetti,
                addWorkoutToHistory,
                workoutTitle,
                setWorkoutTitle,
                isEditingTitle,
                setIsEditingTitle,
                handleTitleChange,
                saveTimersToURL,
            }}
        >
            {children}
        </TimersContext.Provider>
    );
};

export default TimersProvider;
