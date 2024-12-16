import styled from 'styled-components';
import colors from './colors';
import { STATUS } from './constants';

// Timers Styles
interface TimerContainerProps {
    isActive?: boolean;
}
const Timers = styled.div`
  padding-top: 2rem;
display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-content: space-between;
  gap: 2rem;
`;

const TimerTitle = styled.div<TimerContainerProps>`
  font-size: ${props => (props.isActive ? '1rem' : '0.75rem')};
  font-family: sans-serif;
  color: white;
  text-align: center;
  padding-top: 2rem;
  text-transform: uppercase;
letter-spacing: .1rem;

`;

const TimerContainer = styled.div<TimerContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: space-between;
  background-color: ${props => (props.isActive ? '#3A7D44' : 'grey')};  
  border-radius: 10px;
  flex-basis: 100%;
  flex-grow: 1;
  margin-top: 0.5rem;
   opacity: ${props => (props.isActive ? 1 : 0.5)}; 
   height: 180px;
  
`;

const TimerHeader = styled.div<TimerContainerProps>`
     opacity: ${props => (props.isActive ? 1 : 0.5)}; 
  
      transition: all 0.3s ease; 
`;

const Timer = styled.div<TimerContainerProps>`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
 width: 250px;
 height: 60px;
 padding: 1rem; 
  margin: 20px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 10px;
`;

const TimeDisplay = styled.div<TimerContainerProps>`
  border: 2px solid white;
  color: ${props => (props.isActive ? 'black' : 'grey')}; 
  display: flex;
  width: 200px;
    align-items: center;
  justify-content: center;
    gap: 0.5rem;
    font-size: '0.75rem'

`;

// Buttons

const baseButtonStyle = `
  font-size: 0.75rem;
  padding: 0.5rem 0.7rem;
  margin: 0.7rem 0rem;
  border-radius: 20px;
  border: 0px solid;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: white;
  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button<TimerContainerProps>`
${baseButtonStyle}
`;

const LandingButton = styled.div`
${baseButtonStyle}
background-color: #D1A974;
font-size: 1rem;
font-weight: bolder;
width: 12rem;
`;

const EditingModeButton = styled.button<{ disabled?: boolean; bgColor?: string }>`
  ${baseButtonStyle}
  background-color: ${({ bgColor }) => bgColor || colors.primary};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  width: 150px;
  margin: 0px;
`;

const StyledQueueButton = styled(EditingModeButton)<{ isComplete?: boolean; status?: string; isEditing?: boolean; noSecondsInQueue?: boolean }>`
  background-color: ${({ status, isComplete }) => (isComplete ? colors.accent : status === STATUS.STARTED ? colors.red : colors.accent)};
  opacity: ${({ isComplete, isEditing, noSecondsInQueue }) => (isComplete || isEditing || noSecondsInQueue ? 0.3 : 1)};
  pointer-events: ${({ isComplete, isEditing, noSecondsInQueue }) => (isComplete || isEditing || noSecondsInQueue ? 'none' : 'auto')};
  font-size: 1rem;
  margin: 0.7rem 0rem;
`;

const ResetButton = styled(EditingModeButton)<{
    isEditing?: boolean;
    noSecondsInQueue?: boolean;
    noSecondsPassed?: boolean;
}>`
  background-color: ${colors.primary};
  font-size: 1rem;
  margin: 0.7rem 0rem;
  opacity: ${({ isEditing, noSecondsInQueue, noSecondsPassed }) => (isEditing || noSecondsInQueue || noSecondsPassed ? 0.3 : 1)};
  pointer-events: ${({ isEditing, noSecondsInQueue, noSecondsPassed }) => (isEditing || noSecondsInQueue || noSecondsPassed ? 'none' : 'auto')};
`;

const SaveEditButton = styled(EditingModeButton)<{
    isEditing: boolean;
    isSaved?: boolean;
}>`
  background-color: ${({ isEditing }) => (isEditing ? colors.green : colors.primary)};
  opacity: ${({ isEditing, isSaved }) => (isEditing && isSaved ? 0.3 : 1)};
  pointer-events: ${({ isEditing, isSaved }) => (isEditing && isSaved ? 'none' : 'auto')};
  width: 500px;
  justify-content: center;
  margin: 0.7rem 0rem;
`;

const SmallButton = styled(Button)`
    background-color: lightgrey;
    width: 5px;
    height: 5px;
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    margin: 0.7rem 0rem;
    border-radius: 20px;
    padding: 0.5rem 0.7rem;

    &:hover {
        opacity: 0.9;
    }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;

`;

//Input Fields

const Input = styled.div`
  font-size: 0.75rem;
  padding-bottom: 20px;
`;

const Inputs = styled.div`
  display: flex;
  justify-content: left;
`;

const SupportText = styled.div`
  font-size: 1rem; 
`;

const MainText = styled.div`
  font-size: 1rem;
  color: black;
`;

const LandingBlock = styled.div`
display: flex;
width: 100%;
flex-grow: 1; 
flex-wrap: wrap; 
justify-Content: center;
`;

const TopContainer = styled.div<{ isEditingWorkout: boolean; hasTimers: boolean }>`
  opacity: ${({ isEditingWorkout, hasTimers }) => (isEditingWorkout || !hasTimers ? 0.3 : 1)};
  pointer-events: ${({ isEditingWorkout, hasTimers }) => (isEditingWorkout || !hasTimers ? 'none' : 'auto')};
  padding-left: 2rem;
  padding-right: 2rem;
  position: absolute;
  top: 10rem;
  width: 90%;
`;

const MainContaier = styled.div`
display: flex;
  padding-top: 11rem;
  padding-left: 3rem;
  width: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftContainer = styled.div`
position: sticky;
  top: 10rem;
  align-self: flex-start;
  min-width: 500px;
  max-width: 30%;
  margin-right: 1rem;`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

//Landing Page Design

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background: #3b4856;
    padding: 2rem;
`;

const Main = styled.main`
    flex: 1;
    padding: 2rem;
    background: linear-gradient(to top, white, #d9d9d9, white);
`;

const NavList = styled.ul`
    display: flex;
    text-align: right;
    justify-content: right;
    gap: 1rem;
    min-width: 10rem;
    font-variant: all-small-caps;
    flex-basis: 80%;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Footer = styled.footer`
    background-color: #3b4856;
    padding: 1rem 2rem;
    text-align: center;
    color: white;

    a {
        color: #d1a974;
        text-decoration: none;
        margin: 0 1rem;
    }
`;

const LinkStyle = (isActive: boolean) => `
    text-decoration: underline;
    color: ${isActive ? '#D1A974' : 'white'};
    font-size: 1.1rem;
    font-weight: ${isActive ? 'bold' : 'normal'};
`;

const StyledTitle = styled.h1`
text-align: left;
background: #3b4856;
margin: 0;
font-variant: all-small-caps;
padding-bottom: 8px;
padding-left: 1rem;
color: white;
font-size: 3rem;
flex-basis: 100%;
align-items: center;
`;

// Workout List
const StyledWorkoutList = styled.div`
background: white;
    padding: 2rem 3rem;
    transition: background-color 0.5s ease;
    border-radius: 20px;
    margin-right: 10px;
    width: 400px;
    min-height: 200px;
`;

const EditingTitle = styled.input`
font-size: 1.4rem;
    font-weight: bold;
    background: transparent;
    text-align: left;
    padding-left: 0.5rem;
    width: 100%;
`;

export {
    Button,
    Buttons,
    Input,
    Inputs,
    TimeDisplay,
    TimerContainer,
    Timer,
    TimerTitle,
    SupportText,
    Timers,
    MainText,
    TimerHeader,
    LandingBlock,
    LandingButton,
    TopContainer,
    EditingModeButton,
    StyledQueueButton,
    ResetButton,
    SaveEditButton,
    MainContaier,
    LeftContainer,
    PageContainer,
    Header,
    Main,
    NavList,
    Footer,
    LinkStyle,
    StyledTitle,
    SmallButton,
    StyledWorkoutList,
    EditingTitle,
};
