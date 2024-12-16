import styled from 'styled-components';
import colors from './colors';
import { STATUS } from './constants';

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
// transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0.5)')};
//   transition: all 0.3s ease;

const TimerHeader = styled.div<TimerContainerProps>`
     opacity: ${props => (props.isActive ? 1 : 0.5)}; 
  
      transition: all 0.3s ease; 
`;
// transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0.5)')};
// font-size: ${props => (props.isActive ? '1rem' : '0.8rem')};

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
// width: ${props => (props.isActive ? '200px' : '150px')};
// padding: ${props => (props.isActive ? '20px' : '10px')};
// font-size: ${props => (props.isActive ? '1rem' : '0.8rem')};

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

const Button = styled.button<TimerContainerProps>`
color: white;
margin: 0.7rem 0rem;
border-radius: 20px;
border: 0px solid;
width: 'auto';
height: 'auto';
font-size: 0.75rem;
padding: 0.5rem 0.7rem;
background-color: ${props => (props.isActive ? 'maroon' : '#406450')};
transition: all 0.2s ease-in-out; 
    cursor: pointer; 

    &:hover {
        background-color: ${props => (props.isActive ? 'darkred' : 'darkgreen')}; 
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); 
    }

    &:active {
        transform: translateY(0px); 
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
    } 
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;

`;

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

const LandingButton = styled.div`
background-color: #D1A974;
font-size: 1rem;
font-weight: bolder;
padding: 0.25rem 0.7rem;
color: white;
text-align: center;
margin: 0.7rem 0rem;
border-radius: 20px;
border: 0px solid;
width: 12rem;
transition: all 0.2s ease-in-out; 
    cursor: pointer; 

    &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); 
    }

    &:active {
        transform: translateY(0px); 
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
    } 
`;

const EditingModeButton = styled.button<{ disabled?: boolean; bgColor?: string }>`
  width: 150px;
  background-color: ${({ bgColor }) => bgColor || colors.primary};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  border: none;
  color: #fff;
  border-radius: 20px;
  padding: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  &:hover {
   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); 
  }
`;

const StyledQueueButton = styled(EditingModeButton)<{ isComplete?: boolean; status?: string }>`
  background-color: ${({ status, isComplete }) => (isComplete ? colors.disabled : status === STATUS.STARTED ? colors.red : colors.accent)};
  opacity: ${({ isComplete }) => (isComplete ? 0.3 : 1)};
  pointer-events: ${({ isComplete }) => (isComplete ? 'none' : 'auto')};
  font-size: 1rem;
  margin: 0.7rem 0rem;
`;

const ResetButton = styled(EditingModeButton)`
  background-color: ${colors.secondary}; /* Reuse centralized colors */
  font-size: 1rem;
    margin: 0.7rem 0rem;
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
};
