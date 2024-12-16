import type React from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import type { TimerProps } from '../../utils/TimerProps';
import { DisplayRepsForText } from '../../utils/helpers';
import { convertToSeconds } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';

const CommonTimer: React.FC<TimerProps> = ({ type, repInput, timeMinInputRest, timeSecInputRest, totalSeconds, isActive, isCurrent, onFinish, comments }) => {
    const totalSecondsRest = convertToSeconds(timeMinInputRest || 0, timeSecInputRest || 0) * Number(repInput);

    const { secondsPassed, fastforward, repsRemaining, oneRoundSecondsLeft, isWorkPhase } = useCountdownTimer(totalSeconds, isActive, onFinish, Number(repInput), totalSecondsRest);

    const timerStyle = {
        color: isWorkPhase ? 'green' : 'blue', // Green for work, red for rest
    };

    const remainingTime = totalSeconds - secondsPassed;

    return (
        <div>
            <div className="App">
                <TimerContainer isActive={isActive}>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem', color: 'white' }}> {comments}</div>

                    {(type === 'Countdown' || type === 'Stopwatch') && (
                        <div>
                            <Timer>
                                <DisplayRepsForText repInput={Number(repInput)} />
                                <TimeDisplay>
                                    {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                                </TimeDisplay>
                            </Timer>
                        </div>
                    )}
                    {type === 'Tabata' && (
                        <Timer isActive={isActive}>
                            <TimeDisplay isActive={isActive}>
                                <div style={timerStyle}>
                                    {isWorkPhase ? 'Work ' : 'Rest '}
                                    <>
                                        Left {Math.floor(oneRoundSecondsLeft / 60)}:{oneRoundSecondsLeft % 60}
                                    </>
                                </div>
                                <div style={{ fontSize: '20px', color: 'lightgrey' }}>|</div>
                                <div style={{ fontSize: '14px' }}>On round</div> {repsRemaining}
                            </TimeDisplay>
                        </Timer>
                    )}

                    {type === 'XY' && (
                        <Timer isActive={isActive}>
                            <TimeDisplay isActive={isActive}>
                                <div style={{ fontSize: '14px' }}>Left</div>
                                <div>
                                    {Math.floor(oneRoundSecondsLeft / 60)}:{oneRoundSecondsLeft % 60}
                                </div>
                                <div style={{ fontSize: '20px', color: 'lightgrey' }}>|</div>
                                <div style={{ fontSize: '14px' }}>On round</div> {repsRemaining}
                            </TimeDisplay>
                        </Timer>
                    )}
                </TimerContainer>
            </div>

            <Buttons>
                {isCurrent === true && (
                    <Button onClick={fastforward} style={{ backgroundColor: '#3A7D44' }}>
                        Forward Timer
                    </Button>
                )}
            </Buttons>
        </div>
    );
};

export default CommonTimer;
