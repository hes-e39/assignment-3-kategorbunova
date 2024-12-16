import { useContext } from 'react';
import { DisplayRepsForText, DisplayTimeForText } from '../../utils/helpers';
import { DisplayForTime } from '../../utils/helpers';
import { Button, Buttons, SupportText } from '../../utils/styles';
import { TimersContext } from '../../views/TimerProvider';

type Timer = {
    title: string;
    timeMinInput: string;
    timeSecInput: string;
    timeMinInputRest: string;
    timeSecInputRest: string;
    repInput: string;
    comments: string;
    totalSeconds: number;
};

interface WorkoutTimersListProps {
    timersArray: Timer[];
    totalQueueSeconds: number;
    totalSecondsPassed: number;
    currentTimerIndex: number;
    editTimer: (index: number) => void;
    isSaved: boolean;
    isEditing: boolean;
    isWorkoutHistory: boolean;
    moveTimerUp: (index: number) => void;
    moveTimerDown: (index: number) => void;
    workoutTitle: string;
    setWorkoutTitle: (title: string) => void;
}

const YourWorkoutList: React.FC<WorkoutTimersListProps> = ({
    timersArray,
    totalQueueSeconds,
    totalSecondsPassed,
    currentTimerIndex,
    editTimer,
    isSaved,
    isWorkoutHistory,
    isEditing,
    moveTimerUp,
    moveTimerDown,
    workoutTitle,
}) => {
    const { editingIndex, addTimerView, statusQueue, showAddView, hideAddView, setIsEditingTitle, isEditingTitle, handleTitleChange } = useContext(TimersContext);

    return (
        <div
            style={{
                background: 'white',
                padding: '2rem 3rem',
                transition: 'background-color 0.5s ease',
                borderRadius: '20px',
                marginRight: '10px',
                width: '400px',
                minHeight: '200px',
            }}
        >
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={workoutTitle}
                            onChange={e => handleTitleChange(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                            style={{
                                fontSize: '1.4rem',
                                fontWeight: 'bold',
                                background: 'transparent',
                                textAlign: 'left',
                                paddingLeft: '0.5rem',
                                width: '100%',
                            }}
                        />
                    ) : (
                        workoutTitle || 'Your Workout'
                    )}
                </div>

                {isEditing && (
                    <Button onClick={() => setIsEditingTitle(!isEditingTitle)} style={{ marginLeft: '10px', backgroundColor: 'lightgrey', border: 'none' }}>
                        {isEditingTitle ? 'Save' : 'Edit'}
                    </Button>
                )}
            </div>

            <SupportText>Total Time: {DisplayForTime({ minutesOnTimer: Math.floor(totalQueueSeconds / 60), secondsOnTimer: totalQueueSeconds % 60 })}</SupportText>
            <ol style={{}}>
                {timersArray.map((timer, index) => {
                    const isStarted = index <= currentTimerIndex;
                    const isFinished = index < currentTimerIndex;
                    const timerElapsedTime = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
                    return (
                        <li
                            key={index}
                            style={{
                                color:
                                    editingIndex === index && addTimerView
                                        ? '#D1A974'
                                        : isStarted && statusQueue === 'Started' && !isFinished
                                          ? '#3A7D44'
                                          : (isFinished && statusQueue !== 'Initial' && timerElapsedTime >= 0) || totalSecondsPassed === totalQueueSeconds
                                            ? 'gray'
                                            : 'black',
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p
                                        style={{
                                            margin: '0px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {DisplayTimeForText(timer.timeMinInput, timer.timeSecInput)}
                                        {(Number(timer.timeSecInputRest) !== 0 || Number(timer.timeMinInputRest) !== 0) && (
                                            <> (Work) + {DisplayTimeForText(timer.timeMinInputRest, timer.timeSecInputRest)} (Rest)</>
                                        )}{' '}
                                        <DisplayRepsForText repInput={Number(timer.repInput)} />
                                    </p>
                                    <div style={{ fontSize: '0.8rem' }}>{timer.title} </div>
                                    {/* <div style={{ fontSize: '0.75rem' }}>
                                        {isStarted && timerElapsedTime >= 0 && !isFinished && totalSecondsPassed > 0 && ' (started)'}
                                        {isFinished && ' (finished)'}
                                    </div> */}
                                    <div style={{ fontWeight: 'lighter', fontSize: '0.75rem' }}>{timer.comments}</div>
                                </div>

                                {isEditing && (
                                    <div>
                                        {(!isFinished || (!isStarted && timerElapsedTime === 0)) && (
                                            <Buttons style={{ marginLeft: '1rem' }}>
                                                <Button
                                                    onClick={() => editTimer(index)}
                                                    style={{
                                                        backgroundColor: 'lightgrey',
                                                        width: '5px',
                                                        height: '5px',
                                                        fontSize: '0.5rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                                                    }}
                                                >
                                                    <img src="src/utils/images/1416596-200.png" alt="pencil edit icon" height="8px" />
                                                </Button>
                                                {index !== 0 && (
                                                    <Button
                                                        onClick={() => moveTimerUp(index)}
                                                        style={{
                                                            backgroundColor: 'lightgrey',
                                                            width: '5px',
                                                            height: '5px',
                                                            fontSize: '0.5rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                                                        }}
                                                    >
                                                        <img src="src/utils/images/chevron.png" alt="chevron up" height="8px" />
                                                    </Button>
                                                )}
                                                {index !== timersArray.length - 1 && (
                                                    <Button
                                                        onClick={() => moveTimerDown(index)}
                                                        style={{
                                                            backgroundColor: 'lightgrey',
                                                            width: '5px',
                                                            height: '5px',
                                                            fontSize: '0.5rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transform: 'rotate(180deg)',
                                                            boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                                                        }}
                                                    >
                                                        <img src="src/utils/images/chevron.png" alt="chevron down" height="8px" />
                                                    </Button>
                                                )}
                                            </Buttons>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default YourWorkoutList;
