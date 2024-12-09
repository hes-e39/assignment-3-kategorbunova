import { useContext } from 'react';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import type { TimerProps } from '../utils/TimerProps';
import { Button, Buttons, Input, Inputs } from '../utils/styles';
import { TimersContext } from './TimerProvider';
import YourWorkoutList from './YourWorkoutList';

const AddTimersView = () => {
    const {
        timersArray,
        timerInputs,
        handleInputChange,
        removeLastTimer,
        removeAllTimers,
        totalQueueSeconds,
        totalSecondsPassed,
        currentTimerIndex,
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
    } = useContext(TimersContext);

    type TimerTitle = 'Stopwatch' | 'Countdown' | 'XY' | 'Tabata';

    const timers: { title: TimerTitle; C: React.ComponentType<TimerProps> }[] = [
        { title: 'Stopwatch', C: Stopwatch },
        { title: 'Countdown', C: Countdown },
        { title: 'XY', C: XY },
        { title: 'Tabata', C: Tabata },
    ];

    //const [selectedTimer, setSelectedTimer] = useState<TimerTitle | ''>('');

    const saveTimersToURL = () => {
        const encodedTimers = encodeURIComponent(JSON.stringify(timersArray));
        const newUrl = `${window.location.origin}${window.location.pathname}?timers=${encodedTimers}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 800);
    };

    return (
        <div style={{ textAlign: 'left', paddingTop: '2rem', paddingLeft: '5rem', display: 'flex', gap: '1rem' }}>
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
                />
                <Buttons>
                    {timersArray.length !== 0 && (
                        <Buttons style={{ justifyContent: 'left' }}>
                            <Button onClick={() => removeLastTimer()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                                Remove Last
                            </Button>
                            <Button onClick={() => removeAllTimers()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                                Remove All
                            </Button>
                        </Buttons>
                    )}
                    <Button onClick={showAddView} style={{ backgroundColor: 'navy', width: '100px' }}>
                        {!addTimerView ? 'Add Timer' : 'Collapse'}
                    </Button>
                    <Button onClick={saveTimersToURL} style={{ backgroundColor: 'green', width: '100px' }}>
                        Save
                    </Button>
                </Buttons>
            </div>

            {addTimerView && (
                <div style={{ backgroundColor: 'lightblue', minWidth: '20rem', paddingTop: '2rem', paddingLeft: '3rem', paddingRight: '5rem', borderRadius: '10px' }}>
                    <h2>{editingIndex !== null ? 'Edit Timer' : 'Add a Timer'}</h2>
                    <p>{editingIndex !== null ? 'Modify your timer settings.' : 'Add a timer to your workout.'}</p>

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
                            {/* {timers.map(timer => (
                        <div key={`timer-${timer.title}`}>
                            {timer.title} */}
                            <Inputs>
                                <Input>
                                    <select
                                        id="timeMinInput"
                                        style={{ fontSize: '0.75rem', textAlign: 'right' }}
                                        value={timerInputs[selectedTimer]?.timeMinInput || ''}
                                        onChange={e => {
                                            handleInputChange(selectedTimer, 'timeMinInput', e.target.value);
                                        }}
                                    >
                                        <option value="">Minutes</option>
                                        {Array.from({ length: 60 }, (_, index) => (
                                            <option key={index} value={index}>
                                                {index}
                                            </option>
                                        ))}
                                    </select>
                                    :
                                    <select
                                        id="timeMinInput"
                                        style={{ fontSize: '0.75rem', textAlign: 'right' }}
                                        value={timerInputs[selectedTimer]?.timeSecInput || ''}
                                        onChange={e => {
                                            handleInputChange(selectedTimer, 'timeSecInput', e.target.value);
                                        }}
                                    >
                                        <option value="" disabled>
                                            Seconds
                                        </option>
                                        {Array.from({ length: 60 }, (_, index) => (
                                            <option key={index} value={index}>
                                                {index}
                                            </option>
                                        ))}
                                    </select>
                                </Input>
                                {selectedTimer === 'Tabata' && (
                                    <Input>
                                        <select
                                            style={{ fontSize: '0.75rem', textAlign: 'right' }}
                                            id="timeMinInputRest"
                                            value={timerInputs[selectedTimer].timeMinInputRest}
                                            onChange={e => {
                                                handleInputChange(selectedTimer, 'timeMinInputRest', e.target.value);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Rest Minutes
                                            </option>
                                            {Array.from({ length: 60 }, (_, index) => (
                                                <option key={index} value={index}>
                                                    {index}
                                                </option>
                                            ))}
                                        </select>
                                        :
                                        <select
                                            style={{ fontSize: '0.75rem', textAlign: 'left' }}
                                            id="timeSecInputRest"
                                            value={timerInputs[selectedTimer].timeSecInputRest}
                                            onChange={e => {
                                                handleInputChange(selectedTimer, 'timeSecInputRest', e.target.value);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Rest Seconds
                                            </option>
                                            {Array.from({ length: 60 }, (_, index) => (
                                                <option key={index} value={index}>
                                                    {index}
                                                </option>
                                            ))}
                                        </select>
                                    </Input>
                                )}
                                {(selectedTimer === 'XY' || selectedTimer === 'Tabata') && (
                                    <Input>
                                        <select
                                            style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'left' }}
                                            id="repInput"
                                            value={timerInputs[selectedTimer].repInput}
                                            onChange={e => {
                                                handleInputChange(selectedTimer, 'repInput', e.target.value);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Reps
                                            </option>
                                            {Array.from({ length: 15 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </Input>
                                )}
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
                            <Buttons>
                                <Button onClick={handleSaveOrAdd} style={{ backgroundColor: 'navy', width: '100px' }}>
                                    {editingIndex !== null ? 'Save Changes' : 'Add'}
                                </Button>
                            </Buttons>
                            {/* </div> */}
                            {/* ))} */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddTimersView;
