import { useContext } from 'react';
import colors from '../../utils/colors';
import { DisplayRepsForText, DisplayTimeForText } from '../../utils/helpers';
import { DisplayForTime } from '../../utils/helpers';
import { Button, Buttons, EditingTitle, SmallButton, StyledWorkoutList, SupportText } from '../../utils/styles';
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
    isEditing: boolean;
    isSaved: boolean;
    isWorkoutHistory?: boolean;
    moveTimerUp: (index: number) => void;
    moveTimerDown: (index: number) => void;
    workoutTitle?: string;
    setWorkoutTitle?: (title: string) => void;
}

const YourWorkoutList: React.FC<WorkoutTimersListProps> = ({
    timersArray,
    totalQueueSeconds,
    totalSecondsPassed,
    currentTimerIndex,
    editTimer,
    isEditing,
    moveTimerUp,
    moveTimerDown,
    workoutTitle,
}) => {
    const { editingIndex, addTimerView, statusQueue, setIsEditingTitle, isEditingTitle, handleTitleChange } = useContext(TimersContext);

    return (
        <StyledWorkoutList>
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                    {isEditingTitle ? (
                        <EditingTitle type="text" value={workoutTitle} onChange={e => handleTitleChange(e.target.value)} onBlur={() => setIsEditingTitle(false)} />
                    ) : (
                        workoutTitle || 'Your Workout'
                    )}
                </div>

                {isEditing && (
                    <Button onClick={() => setIsEditingTitle(!isEditingTitle)} style={{ backgroundColor: 'lightgrey', border: 'none', margin: '10px 10px', padding: '2px 10px' }}>
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
                                        ? colors.accent
                                        : isStarted && statusQueue === 'Started' && !isFinished
                                          ? colors.green
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
                                    <div style={{ fontWeight: 'lighter', fontSize: '0.75rem' }}>{timer.comments}</div>
                                </div>

                                {isEditing && (
                                    <div>
                                        {(!isFinished || (!isStarted && timerElapsedTime === 0)) && (
                                            <Buttons style={{ marginLeft: '1rem' }}>
                                                <SmallButton onClick={() => editTimer(index)}>
                                                    <img src="public/edit.jpg" alt="pencil edit icon" height="8px" />
                                                </SmallButton>
                                                {index !== 0 && (
                                                    <SmallButton onClick={() => moveTimerUp(index)}>
                                                        <img src="public/chevron.jpg" alt="chevron up" height="8px" />
                                                    </SmallButton>
                                                )}
                                                {index !== timersArray.length - 1 && (
                                                    <SmallButton onClick={() => moveTimerDown(index)}>
                                                        <img src="public/chevron.jpg" alt="chevron down" height="8px" />
                                                    </SmallButton>
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
        </StyledWorkoutList>
    );
};

export default YourWorkoutList;
