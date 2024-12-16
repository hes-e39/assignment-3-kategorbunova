import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import colors from './utils/colors';
import { Footer, Header, Main, NavList, PageContainer, StyledTitle } from './utils/styles';
import LandingView from './views/LandingView';
import { TimersProvider } from './views/TimerProvider';
import TimersView from './views/TimersView';
import WorkoutHistoryView from './views/WorkoutsHistoryView';

const PageIndex = () => {
    return (
        <PageContainer>
            <Header>
                <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: '30rem' }}>
                    <img src="src/utils/images/image.png" alt="Logo" width="50" height="50px" />
                    <StyledTitle>
                        <span style={{ color: 'white' }}>Tick</span>
                        <span style={{ color: colors.accent }}>Fit</span>
                    </StyledTitle>
                </NavLink>

                <NavList>
                    <ol>
                        <NavLink to="/workout" style={({ isActive }) => linkStyle(isActive)}>
                            Current Workout
                        </NavLink>
                    </ol>
                    <ol>
                        <NavLink to="/history" style={({ isActive }) => linkStyle(isActive)}>
                            Completed Workouts
                        </NavLink>
                    </ol>
                </NavList>
            </Header>

            <Main>
                <Outlet />
            </Main>

            <Footer>
                <p style={{ margin: '0', color: 'white' }}>TickFit. Created by Kate Gorbunova.</p>
                <nav>
                    <a href="https://github.com/kategorbunova" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/kategorbunova/" style={footerLinkStyle}>
                        LinkedIn
                    </a>
                    <a href="https://www.kategorbunova.com" style={footerLinkStyle}>
                        Portfolio
                    </a>
                </nav>
            </Footer>
        </PageContainer>
    );
};

const footerLinkStyle = {
    color: colors.accent,
    textDecoration: 'none',
    margin: '0 1rem',
};

const linkStyle = (isActive: boolean) => ({
    textDecoration: 'underline',
    color: isActive ? colors.accent : 'white',
    fontSize: '1.1rem',
    fontWeight: isActive ? 'bold' : 'normal',
});

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        children: [
            {
                index: true,
                element: <LandingView />,
            },
            {
                path: '/workout',
                element: <TimersView />,
            },
            {
                path: '/history',
                element: <WorkoutHistoryView />,
            },
        ],
    },
]);
const FallbackComponent = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div>
        <h2>Something went wrong!</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            <TimersProvider>
                <RouterProvider router={router} />
            </TimersProvider>
        </ErrorBoundary>
    </StrictMode>,
);
