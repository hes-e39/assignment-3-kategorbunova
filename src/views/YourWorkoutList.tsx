import { useContext } from 'react';
import { DisplayRepsForText, DisplayTimeForText } from '../utils/helpers';
import { Button, Buttons, SupportText } from '../utils/styles';
import { TimersContext } from './TimerProvider';

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
    moveTimerUp: (index: number) => void;
    moveTimerDown: (index: number) => void;
}

const YourWorkoutList: React.FC<WorkoutTimersListProps> = ({ timersArray, totalQueueSeconds, totalSecondsPassed, currentTimerIndex, editTimer, isSaved, isEditing, moveTimerUp, moveTimerDown }) => {
    const { editingIndex, addTimerView } = useContext(TimersContext);

    return (
        <div style={{ backgroundColor: isSaved ? 'green' : 'lightgrey', borderRadius: '10px', padding: '2rem 3rem', minWidth: '25rem', transition: 'background-color 0.5s ease' }}>
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
                        <li
                            key={index}
                            style={{
                                color:
                                    editingIndex === index && addTimerView
                                        ? 'blue'
                                        : ((isStarted || isFinished) && timerElapsedTime > 0) || totalSecondsPassed === totalQueueSeconds
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
                                        {timer.title}{' '}
                                    </p>
                                    {DisplayTimeForText(timer.timeMinInput, timer.timeSecInput)}
                                    {(Number(timer.timeSecInputRest) !== 0 || Number(timer.timeMinInputRest) !== 0) && (
                                        <> (Work) + {DisplayTimeForText(timer.timeMinInputRest, timer.timeSecInputRest)} (Rest)</>
                                    )}
                                    <DisplayRepsForText repInput={Number(timer.repInput)} /> {isStarted && timerElapsedTime > 0 && !isFinished && ' (started)'}
                                    {isFinished && ' (finished)'}
                                    <div style={{ fontWeight: 'lighter', fontSize: '0.75rem' }}>{timer.comments}</div>
                                </div>

                                {isEditing && (
                                    <div>
                                        {(!isFinished || (!isStarted && timerElapsedTime === 0)) && (
                                            <Buttons>
                                                <Button onClick={() => editTimer(index)} style={{ backgroundColor: 'darkgrey', width: '20px', height: '20px' }}>
                                                    <img src="src/utils/1416596-200.png" alt="pencil editing logo" width="10px" />
                                                </Button>
                                                {index !== 0 && (
                                                    <Button onClick={() => moveTimerUp(index)} style={{ backgroundColor: 'darkgrey', width: '20px', height: '20px' }}>
                                                        <img src="src/utils/chevron.png" alt="chevron arrow up" width="10px" />
                                                    </Button>
                                                )}
                                                {index !== timersArray.length - 1 && (
                                                    <Button
                                                        onClick={() => moveTimerDown(index)}
                                                        style={{ backgroundColor: 'darkgrey', width: '20px', height: '20px', justifyContent: 'center', rotate: '180deg' }}
                                                    >
                                                        <img src="src/utils/chevron.png" alt="chevron arrow up" width="10px" />
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
