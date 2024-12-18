import { useNavigate } from 'react-router-dom';
import { LandingBlock, LandingButton } from '../utils/styles';

const LandingView = () => {
    const navigate = useNavigate();
    return (
        <div>
            <LandingBlock>
                <div style={{ display: 'block', margin: 'auto 3rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>Choose Your Own Adventure </div>
                    <div style={{ fontWeight: 'lighter' }}>personalize your workouts with varitety of timers </div>
                    <LandingButton onClick={() => navigate('/workout')}>Your Personal Workout</LandingButton>
                </div>

                <div style={{ textAlign: 'center', display: 'block', margin: '3rem' }}>
                    <img src={'public/Image1.png'} alt="dumbbells floating" width="80%" />
                </div>
            </LandingBlock>

            <LandingBlock>
                <div style={{ textAlign: 'center', display: 'block', margin: '3rem' }}>
                    <img src="public/Image2.png" alt="dumbbells floating" width="80%" />
                </div>
                <div style={{ display: 'block', margin: 'auto 4rem', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem' }}>Track Your Progress</div>
                    <div style={{ fontWeight: 'lighter' }}>see a history of your workouts</div>
                    <LandingButton onClick={() => navigate('/history')}>See Completed Workouts</LandingButton>
                </div>
            </LandingBlock>
        </div>
    );
};

export default LandingView;
