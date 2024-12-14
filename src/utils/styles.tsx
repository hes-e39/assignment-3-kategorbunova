import styled from 'styled-components';
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
  justify-content: center;
  align-content: space-between;
  background-color: ${props => (props.isActive ? '#3A7D44' : 'grey')};  
  border-radius: 10px;
  flex-basis: 100%;
  flex-grow: 1;
   opacity: ${props => (props.isActive ? 1 : 0.5)}; 
  
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

const ButtonBack = styled.button<TimerContainerProps>`
background-color: transparent;
border: 2px solid transparent;
border-radius: 40px;
width: 0;
height:  0;
transition: all 0.2s ease-in-out; 
    cursor: pointer; 

    
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

export { Button, Buttons, Input, Inputs, TimeDisplay, TimerContainer, Timer, TimerTitle, SupportText, Timers, MainText, TimerHeader, ButtonBack };
