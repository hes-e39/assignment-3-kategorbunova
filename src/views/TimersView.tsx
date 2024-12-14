import { useContext } from 'react';
import Confetti from 'react-confetti';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { STATUS } from '../utils/constants';
import { DisplayForTime } from '../utils/helpers';
import { TimerHeader } from '../utils/styles';
import { Button, Buttons, Input, Inputs } from '../utils/styles';
import { TimersContext } from './TimerProvider';
import YourWorkoutList from './YourWorkoutList';

interface TimerProps {
    timeMinInput?: string;
    timeSecInput?: string;
    repInput: string;
    timeMinInputRest?: string;
    timeSecInputRest?: string;
    totalSeconds: number;
    isActive: boolean;
    isCurrent: boolean;
    isFinished: boolean;
    onFinish: () => void;
}

const TimersView = () => {
    const {
        timersArray,
        resetTimers,
        totalQueueSeconds,
        totalSecondsPassed,
        setTotalSecondsPassed,
        currentTimerIndex,
        setCurrentTimerIndex,
        statusQueue,
        setStatusQueue,
        timerInputs,
        handleInputChange,
        removeLastTimer,
        removeAllTimers,
        isSaved,
        setIsSaved,
        showAddView,
        addTimerView,
        editTimer,
        handleSaveOrAdd,
        editingIndex,
        selectedTimer,
        setSelectedTimer,
        moveTimerDown,
        moveTimerUp,
        setTimersArray,
        setIsWorkoutComplete,
        isWorkoutComplete,
        isEditingWorkout,
        setIsEditingWorkout,
        error,
        setError,
        hideAddView,
        showConfetti,
        workoutTitle,
    } = useContext(TimersContext);

    interface DropdownProps {
        id: string;
        label: string;
        value: string | number | undefined;
        onChange: (value: string) => void;
        options: number[];
        style?: React.CSSProperties;
        placeholder?: string;
    }

    const Dropdown: React.FC<DropdownProps> = ({ id, label, value, onChange, options, style, placeholder }) => {
        return (
            <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor={id} style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    {label}
                </label>
                <select
                    id={id}
                    style={{ fontSize: '0.75rem', textAlign: 'right', ...style }}
                    value={value || ''}
                    onChange={e => {
                        onChange(e.target.value);
                        setError(null);
                    }}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    type TimerComponent = React.FC<TimerProps>;
    type TimerTitle = 'Stopwatch' | 'Countdown' | 'XY' | 'Tabata';

    const timers: { title: string; C: TimerComponent }[] = [
        { title: 'Stopwatch', C: Stopwatch },
        { title: 'Countdown', C: Countdown },
        { title: 'XY', C: XY },
        { title: 'Tabata', C: Tabata },
    ];

    const handleTimerFinish = () => {
        const newIndex = currentTimerIndex;
        const newIndexUpdated = newIndex + 1;
        setCurrentTimerIndex(newIndexUpdated);
    };

    const startStopQueue = () => {
        if (statusQueue !== STATUS.STARTED) {
            setStatusQueue(STATUS.STARTED);
        } else {
            setStatusQueue(STATUS.STOPPED);
        }
    };

    const resetQueue = () => {
        resetTimers();
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
        setStatusQueue(STATUS.INITIAL);
    };

    const saveTimersToURL = () => {
        const encodedTimers = encodeURIComponent(JSON.stringify(timersArray));
        const newUrl = `${window.location.origin}${window.location.pathname}?timers=${encodedTimers}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        setIsSaved(true);
        setIsEditingWorkout(false);
    };

    const editWorkout = () => {
        setIsEditingWorkout(true);
        setIsSaved(false);
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
        setStatusQueue(STATUS.INITIAL);
        resetTimers();
    };

    const totalSecondsLeft = totalQueueSeconds - totalSecondsPassed;

    return (
        <div>
            {/* TOP SECTION WITH PROGRESS */}

            <div
                style={{
                    opacity: isEditingWorkout || timersArray.length === 0 ? 0.3 : 1,
                    pointerEvents: isEditingWorkout || timersArray.length === 0 ? 'none' : 'auto',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    position: 'absolute',
                    top: '10rem',
                    width: '90%',
                }}
            >
                <div>
                    {/* {timersArray.length > 0 && ( */}
                    <Buttons style={{ justifyContent: 'left' }}>
                        {/* {totalSecondsPassed !== totalQueueSeconds && ( */}
                        <Button
                            onClick={startStopQueue}
                            style={{
                                backgroundColor: statusQueue === STATUS.STARTED ? '#B0413E' : '#D1A974',
                                fontSize: '1rem',
                                opacity: isWorkoutComplete ? 0.3 : 1,
                                pointerEvents: isWorkoutComplete ? 'none' : 'auto',
                            }}
                        >
                            {statusQueue === STATUS.STARTED ? 'Pause Workout' : 'Start Workout'}
                        </Button>
                        {/* )} */}
                        {/* {Number(totalSecondsPassed) > 0 && ( */}
                        <Button onClick={resetQueue} style={{ backgroundColor: '#3B4856', fontSize: '1rem' }}>
                            Reset Workout
                        </Button>
                        {/* )} */}
                    </Buttons>
                    {/* )} */}

                    {/* {timersArray.length > 0 && ( */}
                    <div>
                        <h3 style={{ margin: 0 }}>Time Left: {DisplayForTime({ minutesOnTimer: Math.floor(totalSecondsLeft / 60), secondsOnTimer: totalSecondsLeft % 60 })}</h3>
                        <progress value={totalSecondsPassed / totalQueueSeconds} max="1" style={{ width: '100%', height: '1rem' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <p style={{ margin: 0, fontSize: '0.6rem' }}>
                                Time Passed: {Math.floor(totalSecondsPassed / 60)} min {totalSecondsPassed % 60} sec
                            </p>
                            <p style={{ margin: 0, fontSize: '0.6rem' }}>
                                Total Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
                            </p>
                        </div>
                    </div>
                    {/* )} */}
                </div>
            </div>

            {/* {isEditingWorkout && (
                <div>
                    <div style={{ paddingLeft: '2rem', paddingRight: '2rem', position: 'absolute', top: '10rem', width: '90%' }}>Editing a workout</div>
                </div>
            )} */}

            {/* MAIN BLOCK WITH CONTENT */}
            <div style={{ display: 'flex', paddingTop: '11rem', paddingLeft: '3rem', width: '100%', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* FIRST BLOCK ON THE LEFT */}
                <div
                    style={{
                        position: 'sticky',
                        top: '10rem',
                        alignSelf: 'flex-start',
                        minWidth: '500px',
                        maxWidth: '30%',
                        marginRight: '1rem',
                    }}
                >
                    {isEditingWorkout && (
                        <div>
                            <YourWorkoutList
                                timersArray={timersArray}
                                totalQueueSeconds={totalQueueSeconds}
                                totalSecondsPassed={totalSecondsPassed}
                                currentTimerIndex={currentTimerIndex}
                                isSaved={isSaved}
                                isEditing={true}
                                editTimer={editTimer}
                                moveTimerDown={moveTimerDown}
                                moveTimerUp={moveTimerUp}
                                workoutTitle={workoutTitle}
                            />
                            {/* <Buttons style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                                
                                <Buttons>
                                    <Button
                                        onClick={() => removeLastTimer()}
                                        style={{
                                            backgroundColor: '#69140E',
                                            opacity: timersArray.length === 0 ? 0.3 : 1, // Adjust opacity based on isEditingWorkout
                                            pointerEvents: timersArray.length === 0 ? 'none' : 'auto', // Optional: Dis
                                        }}
                                    >
                                        Remove Last Timer
                                    </Button>
                                    <Button
                                        onClick={() => removeAllTimers()}
                                        style={{
                                            backgroundColor: '#69140E',
                                            opacity: timersArray.length === 0 ? 0.3 : 1, // Adjust opacity based on isEditingWorkout
                                            pointerEvents: timersArray.length === 0 ? 'none' : 'auto', // Optional: Dis
                                        }}
                                    >
                                        Remove All Timers
                                    </Button>

                                </Buttons>
                                {/* )} */}

                            <Button
                                onClick={saveTimersToURL}
                                style={{
                                    backgroundColor: '#3A7D44',
                                    opacity: isSaved ? 0.3 : 1, // Adjust opacity based on isEditingWorkout
                                    pointerEvents: isSaved ? 'none' : 'auto', // Optional: Dis
                                    width: '500px',
                                    justifyContent: 'center',
                                }}
                            >
                                Save Workout
                            </Button>
                            {/* <Button onClick={closeEditWorkout} style={{ backgroundColor: '#5C7457', position: 'absolute', marginTop: '-2rem', width: '300px' }}>
                                Back
                            </Button> */}
                        </div>
                    )}

                    {!isEditingWorkout && (
                        <div>
                            <YourWorkoutList
                                timersArray={timersArray}
                                totalQueueSeconds={totalQueueSeconds}
                                totalSecondsPassed={totalSecondsPassed}
                                currentTimerIndex={currentTimerIndex}
                                isSaved={isSaved}
                                isEditing={false}
                                editTimer={editTimer}
                                moveTimerDown={moveTimerDown}
                                moveTimerUp={moveTimerUp}
                                workoutTitle={workoutTitle}
                            />

                            <Button onClick={editWorkout} style={{ backgroundColor: '#3B4856', width: '500px' }}>
                                Edit Workout
                            </Button>
                        </div>
                    )}
                </div>

                {/* SECOND BLOCK ON THE RIGHT */}
                <div
                    style={{
                        flex: 1,
                        minWidth: '100px',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <div>
                            {isEditingWorkout && (
                                <Buttons style={{ display: 'flex', flexDirection: 'column', width: '150px' }}>
                                    <Button onClick={showAddView} style={{ backgroundColor: '#D1A974', width: '150px' }}>
                                        {addTimerView ? 'Close' : 'Add Timer'}
                                    </Button>

                                    <Button
                                        onClick={() => removeLastTimer()}
                                        style={{
                                            backgroundColor: '#3B4856',
                                            opacity: timersArray.length === 0 ? 0.3 : 1,
                                            pointerEvents: timersArray.length === 0 ? 'none' : 'auto',
                                        }}
                                    >
                                        Remove Last Timer
                                    </Button>
                                    <Button
                                        onClick={() => removeAllTimers()}
                                        style={{
                                            backgroundColor: '#3B4856',
                                            opacity: timersArray.length === 0 ? 0.3 : 1,
                                            pointerEvents: timersArray.length === 0 ? 'none' : 'auto',
                                        }}
                                    >
                                        Remove All Timers
                                    </Button>
                                </Buttons>
                            )}
                        </div>

                        {addTimerView && isEditingWorkout && (
                            <div style={{ marginLeft: '2rem' }}>
                                <div>Choose a timer:</div>
                                <select
                                    id="timerTypeSelect"
                                    style={{ maxWidth: '10rem', fontSize: '0.75rem', marginBottom: '1rem' }}
                                    value={selectedTimer}
                                    onChange={e => setSelectedTimer(e.target.value as TimerTitle)}
                                >
                                    <option value="" disabled>
                                        Choose Timer
                                    </option>
                                    {timers.map(timer => (
                                        <option key={timer.title} value={timer.title}>
                                            {timer.title}
                                        </option>
                                    ))}
                                </select>

                                {selectedTimer && (
                                    <div>
                                        <Inputs>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Dropdown
                                                    id="timeMinInput"
                                                    label="Minutes"
                                                    value={timerInputs[selectedTimer]?.timeMinInput || ''}
                                                    onChange={value => handleInputChange(selectedTimer, 'timeMinInput', value)}
                                                    options={Array.from({ length: 60 }, (_, index) => index)}
                                                    placeholder="Minutes"
                                                />
                                                <Dropdown
                                                    id="timeSecInput"
                                                    label="Seconds"
                                                    value={timerInputs[selectedTimer]?.timeSecInput || ''}
                                                    onChange={value => handleInputChange(selectedTimer, 'timeSecInput', value)}
                                                    options={Array.from({ length: 60 }, (_, index) => index)}
                                                    placeholder="Seconds"
                                                />

                                                {selectedTimer === 'Tabata' && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Dropdown
                                                            id="timeMinInputRest"
                                                            label="Rest Minutes"
                                                            value={timerInputs[selectedTimer]?.timeMinInputRest || ''}
                                                            onChange={value => handleInputChange(selectedTimer, 'timeMinInputRest', value)}
                                                            options={Array.from({ length: 60 }, (_, index) => index)}
                                                            placeholder="Rest Minutes"
                                                        />
                                                        <Dropdown
                                                            id="timeSecInputRest"
                                                            label="Rest Seconds"
                                                            value={timerInputs[selectedTimer]?.timeSecInputRest || ''}
                                                            onChange={value => handleInputChange(selectedTimer, 'timeSecInputRest', value)}
                                                            options={Array.from({ length: 60 }, (_, index) => index)}
                                                            placeholder="Rest Seconds"
                                                        />
                                                    </div>
                                                )}
                                                {(selectedTimer === 'XY' || selectedTimer === 'Tabata') && (
                                                    <Dropdown
                                                        id="repInput"
                                                        label="Reps"
                                                        value={timerInputs[selectedTimer]?.repInput || ''}
                                                        onChange={value => handleInputChange(selectedTimer, 'repInput', value)}
                                                        options={Array.from({ length: 15 }, (_, index) => index + 1)}
                                                        placeholder="Reps"
                                                    />
                                                )}
                                            </div>
                                        </Inputs>
                                        Comments:
                                        <Input>
                                            <input
                                                style={{ fontSize: '0.75rem', textAlign: 'right' }}
                                                id="comments"
                                                value={timerInputs[selectedTimer].comments}
                                                onChange={e => {
                                                    handleInputChange(selectedTimer, 'comments', e.target.value);
                                                }}
                                            />
                                        </Input>
                                        <Button onClick={handleSaveOrAdd} style={{ backgroundColor: '#3A7D44' }}>
                                            {editingIndex !== null ? 'Save Changes' : 'Add'}
                                        </Button>
                                    </div>
                                )}
                                {error && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.5rem' }}>{error}</div>}
                            </div>
                        )}
                    </div>

                    {!isEditingWorkout && (
                        <div>
                            <div style={{ paddingTop: '1rem', fontSize: '1.4rem', fontWeight: 'bold' }}> {totalSecondsLeft !== 0 ? 'Active Timer' : 'Workout Complete!'}</div>
                            {showConfetti && <Confetti recycle={false} />}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
                                <div>
                                    {timersArray.map((timer, index) => {
                                        if (index !== currentTimerIndex) {
                                            return null;
                                        }
                                        const matchedTimer = timers.find(t => t.title === timer.title);

                                        if (!matchedTimer) {
                                            return null;
                                        }

                                        const Timer = matchedTimer.C;

                                        return (
                                            <div key={`timer-${index}`}>
                                                <TimerHeader isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ fontSize: '1.2rem' }}>
                                                            Timer {index + 1}
                                                            {/* {index === currentTimerIndex && ' (Active)'}
                                                                            {index < currentTimerIndex && ' (Finished)'} */}
                                                        </div>
                                                        <div style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>Total timer seconds: {timer.totalSeconds}</div>
                                                    </div>
                                                </TimerHeader>
                                                <Timer
                                                    timeMinInput={timer.timeMinInput}
                                                    timeSecInput={timer.timeSecInput}
                                                    repInput={timer.repInput}
                                                    timeMinInputRest={timer.timeMinInputRest}
                                                    timeSecInputRest={timer.timeSecInputRest}
                                                    totalSeconds={timer.totalSeconds}
                                                    isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}
                                                    isCurrent={index === currentTimerIndex && statusQueue !== STATUS.INITIAL}
                                                    isFinished={index < currentTimerIndex}
                                                    onFinish={handleTimerFinish}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimersView;
