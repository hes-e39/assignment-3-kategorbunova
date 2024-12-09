// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

function convertToSeconds(timeMinInput: number | string, timeSecInput: number | string) {
    return Number(timeMinInput || '0') * 60 + Number(timeSecInput || '0');
}

function TotalSeconds(timeMinInput: number | string, timeSecInput: number | string, timeMinInputRest: number | string, timeSecInputRest: number | string, repInput: number | string) {
    return ((Number(timeMinInput) || 0) * 60 + (Number(timeSecInput) || 0) + (Number(timeMinInputRest) || 0) * 60 + (Number(timeSecInputRest) || 0)) * (Number(repInput) || 1);
}

function DisplayTimeForText(timeMinInput: number | string, timeSecInput: number | string) {
    const minutes = Number(timeMinInput) || 0;
    const seconds = Number(timeSecInput) || 0;

    if (minutes > 0 && seconds === 0) {
        return `${minutes} min`;
    } else if (minutes > 0 && seconds > 0) {
        return `${minutes} min ${seconds} sec`;
    } else if (minutes === 0 && seconds > 0) {
        return `${seconds} sec`;
    } else '';
}

function DisplayRepsForText({ repInput }: { repInput: number }) {
    const repDisplay = repInput > 1 ? ` for ${repInput} reps ` : '';

    return `${repDisplay}`;
}

type DisplayForTimeProps = {
    //hoursOnTimer: number;
    minutesOnTimer: number;
    secondsOnTimer: number;
};

function DisplayForTime({ minutesOnTimer, secondsOnTimer }: DisplayForTimeProps): string {
    //const hours = hoursOnTimer > 0 ? `${String(hoursOnTimer).padStart(2, '0')}:` : '';
    const minutes = `${String(minutesOnTimer).padStart(2, '0')}:`;
    const seconds = `${String(secondsOnTimer).padStart(2, '0')}`;

    return `${minutes}${seconds}`;
}

type TimeOnTimerProps = {
    secondsRemaining: number;
};

type TimeOnTimerReturn = {
    //hoursOnTimer: number;
    minutesOnTimer: number;
    secondsOnTimer: number;
};

function TimeOnTimer({ secondsRemaining }: TimeOnTimerProps): TimeOnTimerReturn {
    const secondsOnTimer = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsOnTimer) / 60;
    const minutesOnTimer = minutesRemaining % 60;
    //const hoursOnTimer = (minutesRemaining - minutesOnTimer) / 60;

    return {
        //hoursOnTimer,
        minutesOnTimer,
        secondsOnTimer,
    };
}

function InputsValidation(totalSeconds: number | string) {
    if (Number.isNaN(totalSeconds) || Number(totalSeconds) <= 0) {
        return false;
    }
}

export { convertToSeconds, DisplayTimeForText, DisplayRepsForText, DisplayForTime, TimeOnTimer, TotalSeconds, InputsValidation };
