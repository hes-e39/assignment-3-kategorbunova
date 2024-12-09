import { useContext, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom'; // Make sure to import Link
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { STATUS } from '../utils/constants';
import { Button, Buttons, TimerHeader } from '../utils/styles';
import { Timers } from '../utils/styles';
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

const FallbackComponent = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div>
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

const TimersView = () => {
    const { timersArray, resetTimers, totalQueueSeconds, totalSecondsPassed, setTotalSecondsPassed, currentTimerIndex, setCurrentTimerIndex, statusQueue, setStatusQueue, editTimer } =
        useContext(TimersContext);

    type TimerComponent = React.FC<TimerProps>;

    const timers: { title: string; C: TimerComponent }[] = [
        { title: 'Stopwatch', C: Stopwatch },
        { title: 'Countdown', C: Countdown },
        { title: 'XY', C: XY },
        { title: 'Tabata', C: Tabata },
    ];

    const handleTimerFinish = () => {
        // const newSeconds = totalSecondsPassed;
        // const newObject = newSeconds + secondsElapsed;
        // setTotalSecondsPassed(newObject);

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

    useEffect(() => {
        if (totalSecondsPassed === totalQueueSeconds) {
            setStatusQueue(STATUS.STOPPED);
        }
    }, [totalSecondsPassed, totalQueueSeconds, setStatusQueue]);

    const totalSecondsLeft = totalQueueSeconds - totalSecondsPassed;
    return (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            <div style={{ textAlign: 'left', paddingTop: '2rem', paddingLeft: '5rem', display: 'flex', gap: '4rem' }}>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <YourWorkoutList
                            timersArray={timersArray}
                            totalQueueSeconds={totalQueueSeconds}
                            totalSecondsPassed={totalSecondsPassed}
                            currentTimerIndex={currentTimerIndex}
                            isEditing={false}
                        />

                        {/* <div style={{ background: 'lightgrey', borderRadius: '10px', padding: '2rem 3rem', minWidth: '25rem' }}>
                        <h2>Your Workout</h2>
                        <SupportText>
                            Total Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
                        </SupportText>
                        <ol style={{}}>
                            {timersArray.map((timer, index) => {
                                const isStarted = index <= currentTimerIndex;
                                const isFinished = index < currentTimerIndex;
                                const timerElapsedTime = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
                                return (
                                    <li key={index} style={{ color: ((isStarted || isFinished) && timerElapsedTime > 0) || totalSecondsPassed === totalQueueSeconds ? 'gray' : 'black' }}>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <p style={{ margin: '0px', fontWeight: 'bold' }}>{timer.title} </p>
                                                {DisplayTimeForText(timer.timeMinInput, timer.timeSecInput)}
                                                {(Number(timer.timeSecInputRest) !== 0 || Number(timer.timeMinInputRest) !== 0) && (
                                                    <> (Work) + {DisplayTimeForText(timer.timeMinInputRest, timer.timeSecInputRest)} (Rest)</>
                                                )}
                                                <DisplayRepsForText repInput={Number(timer.repInput)} /> {isStarted && timerElapsedTime > 0 && !isFinished && ' (started)'}
                                                {isFinished && ' (finished)'}
                                                <div style={{ fontWeight: 'lighter', fontSize: '0.75rem' }}>{timer.comments}</div>
                                            </div>

                                            <div style={{ justifyContent: 'right' }}>
                                                {!isFinished && (
                                                    <Button onClick={resetQueue} style={{ backgroundColor: 'darkgrey', width: '50px', height: '20px' }}>
                                                        Edit
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div> */}
                    </div>
                </div>

                <div>
                    {timersArray.length > 0 && (
                        <Buttons style={{ justifyContent: 'left' }}>
                            {totalSecondsPassed !== totalQueueSeconds && (
                                <Button onClick={startStopQueue} style={{ backgroundColor: statusQueue === STATUS.STARTED ? 'maroon' : 'green' }}>
                                    {statusQueue === STATUS.STARTED ? 'Pause Queue' : 'Start Queue'}
                                </Button>
                            )}

                            {Number(totalSecondsPassed) > 0 && (
                                <Button onClick={resetQueue} style={{ backgroundColor: 'navy' }}>
                                    Reset Queue
                                </Button>
                            )}
                        </Buttons>
                    )}
                    <h3 style={{ margin: 0 }}>
                        Time Left: {Math.floor(totalSecondsLeft / 60)} min {totalSecondsLeft % 60} sec{' '}
                    </h3>
                    <progress value={totalSecondsPassed / totalQueueSeconds} max="1" style={{ width: '80%', height: '1rem' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <p style={{ margin: 0 }}>
                            Time Passed: {Math.floor(totalSecondsPassed / 60)} min {totalSecondsPassed % 60} sec
                        </p>
                        <p style={{ margin: 0 }}>
                            Total Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
                        </p>
                    </div>
                    {timersArray.length === 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'grey', padding: '2rem' }}>
                            <p>
                                Navigate to the{' '}
                                <Link to="/add" style={{ color: 'blue', textDecoration: 'underline' }}>
                                    Add page
                                </Link>{' '}
                                to add timers to your queue
                            </p>
                        </div>
                    )}

                    <Timers>
                        {timersArray.map((timer, index) => {
                            const matchedTimer = timers.find(t => t.title === timer.title);

                            if (!matchedTimer) {
                                return null;
                            }

                            const Timer = matchedTimer.C;

                            return (
                                <div key={`timer-${index}`}>
                                    <TimerHeader isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '1.5rem' }}>
                                                Timer {index + 1}
                                                {index === currentTimerIndex && ' (Active)'}
                                                {index < currentTimerIndex && ' (Finished)'}
                                            </div>
                                            <div style={{ fontStyle: 'italic' }}>Total seconds: {timer.totalSeconds}</div>
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
                    </Timers>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default TimersView;
