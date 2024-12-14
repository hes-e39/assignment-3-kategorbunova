import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import LandingView from './views/LandingView';
import { TimersProvider } from './views/TimerProvider';
import TimersView from './views/TimersView';
import WorkoutHistoryView from './views/WorkoutsHistoryView';

const PageIndex = () => {
    return (
        <div style={pageIndexStyle}>
            <header style={headerStyle}>
                <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: '30rem' }}>
                    <img src="src/utils/images/image.png" alt="Logo" width="50" height="50px" />
                    <h1
                        style={{
                            textAlign: 'left',
                            background: '#3B4856',
                            margin: '0',
                            fontVariant: 'all-small-caps',
                            paddingBottom: '8px',
                            paddingLeft: '1rem',
                            color: 'white',
                            fontSize: '3rem ',
                            flexBasis: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ color: 'white' }}>Tick</span>
                        <span style={{ color: '#D1A974' }}>Fit</span>
                    </h1>
                </NavLink>

                <ul style={navListStyle}>
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
                </ul>
            </header>

            <main style={mainStyle}>
                <Outlet />
            </main>

            <footer style={footerStyle}>
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
            </footer>
        </div>
    );
};

const pageIndexStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'right',
    background: '#3B4856',
    padding: '2rem',
};
const mainStyle = {
    flex: '1',
    padding: '2rem',
    background: 'linear-gradient(to top, white, #d9d9d9, white)',
};

const navListStyle = {
    display: 'flex',
    textAlign: 'right',
    justifyContent: 'right',
    gap: '1rem',
    minWidth: '10rem',
    fontVariant: 'all-small-caps',
    flexBasis: '80%',
    listStyle: 'none',
    margin: '0',
    padding: '0',
};

const footerStyle = {
    backgroundColor: '#3B4856',
    padding: '1rem 2rem',
    textAlign: 'center',
    color: 'white',
};

const footerLinkStyle = {
    color: '#D1A974',
    textDecoration: 'none',
    margin: '0 1rem',
};

const linkStyle = (isActive: boolean) => ({
    textDecoration: 'underline',
    color: isActive ? '#D1A974' : 'white',
    fontSize: '1.1rem',
    fontWeight: isActive ? 'bold' : 'normal',
});

// const TimersPages = () => {
//   return (
//     <ul>
//         <li>
//           <Link to="/">Countdown</Link>
//         </li>
//         <li>
//           <Link to="/docs">Stopwatch</Link>
//         </li>
//       </ul>
//   )
// }

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        children: [
            {
                index: true,
                element: <LandingView />,
            },
            // {
            //     path: '/docs',
            //     element: <DocumentationView />,
            // },
            // {
            //     path: '/add',
            //     element: <AddTimersView />,
            // },
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

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            <TimersProvider>
                <RouterProvider router={router} />
            </TimersProvider>
        </ErrorBoundary>
    </StrictMode>,
);
