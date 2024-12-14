import { useContext } from 'react';
import type React from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { useTimerSync } from '../../hooks/useTimerSync';
import type { TimerProps } from '../../utils/TimerProps';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';
import { TimersContext } from '../../views/TimerProvider';

const Countdown: React.FC<TimerProps> = ({ repInput, totalSeconds, isActive, isCurrent, onFinish, isFinished }) => {
    const { secondsPassed, setSecondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, Number(repInput), 0);

    const { totalSecondsPassed, currentTimerIndex, timersArray } = useContext(TimersContext);

    //This is to keep the UI of timers consistent with global variables and not reset them when clicking from Add to Home pages.
    //I know I'm reusing this across components because composers stayed local.
    // I changed this hook to be a custom hook that can be reused across components. It's probably still not the best way to display the time,
    // since ideally it would just take global variables to begin with. But I'm just using the hook to update the local to sync with global.
    //Could be an improvement for A3.
    useTimerSync({ isCurrent, isFinished, totalSeconds, totalSecondsPassed, currentTimerIndex, timersArray, setSecondsPassed });

    const remainingTime = totalSeconds - secondsPassed;

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>Countdown</TimerTitle>
                <Timer>
                    <DisplayRepsForText repInput={Number(repInput)} />
                    <TimeDisplay>
                        {Math.floor(remainingTime / 60)}:{remainingTime % 60}
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

export default Countdown;
