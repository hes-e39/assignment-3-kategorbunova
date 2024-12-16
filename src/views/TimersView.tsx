import { useContext } from 'react';
import Confetti from 'react-confetti';
import CommonTimer from '../components/timers/CommonTimer';
import Dropdown from '../components/workout/Dropdown';
import YourWorkoutList from '../components/workout/YourWorkoutList';
import colors from '../utils/colors';
import { STATUS } from '../utils/constants';
import { DisplayForTime } from '../utils/helpers';
import { TimerHeader } from '../utils/styles';
import { Button, Buttons, EditingModeButton, Input, Inputs, LeftContainer, MainContaier, ResetButton, SaveEditButton, StyledQueueButton, TopContainer } from '../utils/styles';
import { TimersContext } from './TimerProvider';

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
        isWorkoutComplete,
        isEditingWorkout,
        setIsEditingWorkout,
        error,
        showConfetti,
        workoutTitle,
        saveTimersToURL,
    } = useContext(TimersContext);

    type TimerTitle = 'Stopwatch' | 'Countdown' | 'XY' | 'Tabata';

    const timers: { title: string }[] = [{ title: 'Stopwatch' }, { title: 'Countdown' }, { title: 'XY' }, { title: 'Tabata' }];

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

    const editWorkout = () => {
        setIsEditingWorkout(true);
        setIsSaved(false);
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
        setStatusQueue(STATUS.INITIAL);
        resetTimers();
    };

    const renderWorkoutList = isEditing => (
        <YourWorkoutList
            timersArray={timersArray}
            totalQueueSeconds={totalQueueSeconds}
            totalSecondsPassed={totalSecondsPassed}
            currentTimerIndex={currentTimerIndex}
            isSaved={isSaved}
            isEditing={isEditing}
            editTimer={editTimer}
            moveTimerDown={moveTimerDown}
            moveTimerUp={moveTimerUp}
            workoutTitle={workoutTitle}
        />
    );

    const totalSecondsLeft = totalQueueSeconds - totalSecondsPassed;

    return (
        <div>
            {/* TOP SECTION WITH PROGRESS */}

            <TopContainer isEditingWorkout={isEditingWorkout} hasTimers={timersArray.length > 0}>
                <div>
                    <Buttons style={{ justifyContent: 'left' }}>
                        <StyledQueueButton onClick={startStopQueue} status={statusQueue} isComplete={isWorkoutComplete}>
                            {statusQueue === STATUS.STARTED ? 'Pause Workout' : 'Start Workout'}
                        </StyledQueueButton>
                        <ResetButton onClick={resetQueue}>Reset Workout</ResetButton>
                    </Buttons>

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
                </div>
            </TopContainer>

            {/* MAIN BLOCK WITH CONTENT */}
            <MainContaier>
                {/* FIRST BLOCK ON THE LEFT */}
                <LeftContainer>
                    {isEditingWorkout ? renderWorkoutList(true) : renderWorkoutList(false)}
                    <div>
                        <SaveEditButton onClick={isEditingWorkout ? saveTimersToURL : editWorkout} isEditing={isEditingWorkout} isSaved={isSaved}>
                            {isEditingWorkout ? 'Save Workout' : 'Edit Workout'}
                        </SaveEditButton>
                    </div>
                </LeftContainer>

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

                                    <EditingModeButton onClick={() => removeLastTimer()} bgColor={colors.primary} disabled={timersArray.length === 0}>
                                        Remove Last Timer
                                    </EditingModeButton>
                                    <EditingModeButton onClick={() => removeAllTimers()} bgColor={colors.primary} disabled={timersArray.length === 0}>
                                        Remove All Timers
                                    </EditingModeButton>
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
                            <div style={{ paddingTop: '0.75rem', fontSize: '1.4rem', fontWeight: 'bold' }}>
                                {' '}
                                {totalSecondsLeft !== 0 && totalQueueSeconds !== 0 ? 'Active Timer' : 'Workout Complete!'}
                            </div>
                            {showConfetti && <Confetti recycle={false} />}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
                                <div>
                                    {timersArray.map((timer, index) => {
                                        if (index !== currentTimerIndex) {
                                            return null;
                                        }

                                        return (
                                            <div key={`timer-${index}`}>
                                                <TimerHeader isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ fontSize: '1.2rem' }}>
                                                            Timer {index + 1} | {timer.title}
                                                        </div>
                                                        <div style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>Total timer seconds: {timer.totalSeconds}</div>
                                                    </div>
                                                </TimerHeader>
                                                <CommonTimer
                                                    type={timer.title}
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
                                                    comments={timer.comments}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </MainContaier>
        </div>
    );
};

export default TimersView;
