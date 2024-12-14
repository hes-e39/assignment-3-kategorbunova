import { useNavigate } from 'react-router-dom';
import { Button } from '../utils/styles';

const LandingView = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', width: '100%', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ display: 'block', margin: 'auto 3rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>Choose Your Own Adventure </div>
                    <div style={{ fontWeight: 'lighter' }}>personalize your workouts with varitety of timers </div>
                    <Button
                        onClick={() => navigate('/workout')}
                        style={{
                            backgroundColor: '#D1A974 ',
                            fontSize: '1rem',
                            fontWeight: 'bolder',
                            padding: '0.25rem 0.7rem',
                        }}
                    >
                        Your Personal Workout
                    </Button>
                </div>

                <div style={{ textAlign: 'center', display: 'block', margin: '3rem' }}>
                    <img src="src/utils/images/Image1.png" alt="dumbbells floating" width="100%" />
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', display: 'block', margin: '3rem' }}>
                    <img src="src/utils/images/Image2.png" alt="dumbbells floating" width="100%" />
                </div>
                <div style={{ display: 'block', margin: 'auto 4rem', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem' }}>Track Your Progress</div>
                    <div style={{ fontWeight: 'lighter' }}>see a history of your workouts</div>
                    <Button
                        onClick={() => navigate('/history')}
                        style={{
                            backgroundColor: '#D1A974 ',
                            fontSize: '1rem',
                            fontWeight: 'bolder',
                            padding: '0.25rem 0.7rem',
                        }}
                    >
                        See Completed Workouts
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LandingView;
