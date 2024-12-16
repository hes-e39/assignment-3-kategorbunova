import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import type { TimerProps } from '../../utils/TimerProps';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';

const Stopwatch: React.FC<TimerProps> = ({ repInput, totalSeconds, isActive, isCurrent, onFinish, isFinished }) => {
    // const { totalSecondsPassed, currentTimerIndex, timersArray } = useContext(TimersContext);

    const { secondsPassed, setSecondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, Number(repInput), 0);

    // const currentTimer = timersArray[currentTimerIndex];
    //useTimerSync({ isCurrent, isFinished, totalSeconds, totalSecondsPassed, currentTimerIndex, timersArray, setSecondsPassed });

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>Stopwatch</TimerTitle>
                <Timer isActive={isActive}>
                    <TimeDisplay>
                        <DisplayRepsForText repInput={Number(repInput)} />
                        {Math.floor(secondsPassed / 60)}:{secondsPassed % 60}
                    </TimeDisplay>
                </Timer>
            </TimerContainer>
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

export default Stopwatch;
