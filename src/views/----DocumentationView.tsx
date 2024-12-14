import styled from 'styled-components';

import DocumentComponent from '../components/documentation/DocumentComponent';

//import Loading from "../components/generic/Loading";
import { DisplayForTime } from '../../src/utils/helpers.ts';
import { Button, TimeDisplay, TimerContainer } from '../utils/styles.tsx';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

/**
A1 Version – not updated for A2
 */
const Documentation = () => {
    return (
        <Container>
            <div>
                {/* <DocumentComponent
                    title="DisplayTimeForText "
                    component={<DisplayTimeForText timeMinInput={1} timeSecInput={80} />}
                    propDocs={[
                        {
                            prop: 'totalSeconds',
                            description: 'Changes the size of the loading spinner',
                            type: 'number | string',
                            defaultValue: '0',
                        },
                        {
                            prop: 'timeSecInput',
                            description: 'Displays the seconds part of the input',
                            type: 'number | string',
                            defaultValue: "''",
                        },
                    ]}
                /> */}
                <DocumentComponent
                    title="DisplayForTime "
                    component={<DisplayForTime minutesOnTimer={1} secondsOnTimer={10} />}
                    propDocs={[
                        {
                            prop: 'hoursOnTimer',
                            description: 'Displays the hours on timer, if available',
                            type: 'number',
                            defaultValue: '00',
                        },
                        {
                            prop: 'minutesOnTimer',
                            description: 'Displays the minutes on timer, if available',
                            type: 'number',
                            defaultValue: '00',
                        },
                        {
                            prop: 'secondsOnTimer',
                            description: 'Displays the seconds on timer',
                            type: 'number',
                            defaultValue: '00',
                        },
                    ]}
                />
                <DocumentComponent
                    title="TimerContainer "
                    component={
                        <>
                            <TimerContainer isActive={true}>Active Timer</TimerContainer>
                            <TimerContainer isActive={false}>Inactive Timer</TimerContainer>
                        </>
                    }
                    propDocs={[
                        {
                            prop: 'isActive',
                            description: "Toggles the active state, changing the timer's background color.",
                            type: 'boolean',
                            defaultValue: 'false',
                        },
                    ]}
                />
                <DocumentComponent
                    title="TimeDisplay "
                    component={
                        <>
                            <TimeDisplay isActive={true}>Active Time</TimeDisplay>
                            <TimeDisplay isActive={false}>Inactive Time</TimeDisplay>
                        </>
                    }
                    propDocs={[
                        {
                            prop: 'isActive',
                            description: 'Changes the time of the timer by state',
                            type: 'boolean',
                            defaultValue: 'false',
                        },
                    ]}
                />
                <DocumentComponent
                    title="Button "
                    component={
                        <>
                            <Button isActive={true}>Pause Button</Button>
                            <Button isActive={false}>Start Button</Button>
                        </>
                    }
                    propDocs={[
                        {
                            prop: 'isActive',
                            description: 'Changes the background of the button based on state',
                            type: 'boolean',
                            defaultValue: 'false',
                        },
                    ]}
                />
            </div>
        </Container>
    );
};

export default Documentation;
