import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import AddTimersView from './views/AddTimersView';
import DocumentationView from './views/DocumentationView';
import { TimersProvider } from './views/TimerProvider';
import TimersView from './views/TimersView';

const PageIndex = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Workout Timers</h1>
            <ul style={navListStyle}>
                <li>
                    <NavLink to="/" style={({ isActive }) => linkStyle(isActive)}>
                        Workout Mode
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/docs" style={({ isActive }) => linkStyle(isActive)}>
                        Documentation
                    </NavLink>
                </li> */}
                <li>
                    <NavLink to="/add" style={({ isActive }) => linkStyle(isActive)}>
                        Edit Your Workout
                    </NavLink>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    padding: 0,
    gap: '1rem',
    marginTop: '1rem',
};

const linkStyle = (isActive: boolean) => ({
    textDecoration: 'underline',
    color: 'black',
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
                element: <TimersView />,
            },
            {
                path: '/docs',
                element: <DocumentationView />,
            },
            {
                path: '/add',
                element: <AddTimersView />,
            },
        ],
    },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TimersProvider>
            <RouterProvider router={router} />
        </TimersProvider>
    </StrictMode>,
);
