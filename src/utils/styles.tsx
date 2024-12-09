import styled from 'styled-components';
interface TimerContainerProps {
    isActive?: boolean;
}
const Timers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  gap: 2rem;
    flex-basis: 100%;
    margin: 3rem 10rem;

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
  justify-content: center;
  align-content: space-between;
  background-color: ${props => (props.isActive ? 'green' : 'grey')};  
  border-radius: 10px;
  flex-basis: 100%;
  flex-grow: 1;
   opacity: ${props => (props.isActive ? 1 : 0.5)}; 
  transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0.5)')}; 
  transition: all 0.3s ease; 
`;

const TimerHeader = styled.div<TimerContainerProps>`
     opacity: ${props => (props.isActive ? 1 : 0.5)}; 
    transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0.5)')}; 
    font-size: ${props => (props.isActive ? '1rem' : '0.8rem')};
      transition: all 0.3s ease; 
`;

const Timer = styled.div<TimerContainerProps>`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
   width: ${props => (props.isActive ? '200px' : '150px')}; 
  padding: ${props => (props.isActive ? '20px' : '10px')};
  margin: 20px;
  margin-bottom: 15px;
  font-size: ${props => (props.isActive ? '1rem' : '0.8rem')};
  background-color: white;
  border-radius: 10px;
  
`;

const TimeDisplay = styled.div<TimerContainerProps>`
  border: 2px solid white;
  color: ${props => (props.isActive ? 'black' : 'grey')}; 
  display: flex;
    align-items: center;
  justify-content: center;
    gap: 0.5rem;
    font-size: ${props => (props.isActive ? '1rem' : '0.75rem')};

`;

const Button = styled.button<TimerContainerProps>`
color: white;
margin: 0.25em;
border-radius: 10px;
border: 0px solid;
width: 100px;
height: 30px;
background-color: ${props => (props.isActive ? 'maroon' : 'green')};
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
  justify-content: right;
  align-content: space-between;
  padding-bottom: 1rem;
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

export { Button, Buttons, Input, Inputs, TimeDisplay, TimerContainer, Timer, TimerTitle, SupportText, Timers, MainText, TimerHeader };
