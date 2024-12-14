import { useContext } from 'react';
import { Button } from '../utils/styles';
import { TimersContext } from './TimerProvider';
import YourWorkoutList from './YourWorkoutList';
export type Timer = {
    title: string;
    totalSeconds: number;
    timeMinInput: string;
    timeSecInput: string;
    timeMinInputRest: string;
    timeSecInputRest: string;
    repInput: string;
    comments: string;
};

const WorkoutHistoryView = () => {
    const { workoutsCompleted, addWorkoutToHistory, setWorkoutsCompleted, totalQueueSeconds } = useContext(TimersContext);

    const clearWorkoutHistory = () => {
        setWorkoutsCompleted([]);
        localStorage.removeItem('workoutsCompleted');
    };

    const groupWorkouts = workouts => {
        const workoutMap = new Map();

        workouts.forEach(workout => {
            const workoutKey = `${workout.title}-${JSON.stringify(workout.timers)}`;
            if (workoutMap.has(workoutKey)) {
                workoutMap.get(workoutKey).count += 1;
            } else {
                workoutMap.set(workoutKey, { workout, count: 1 });
            }
        });

        return Array.from(workoutMap.values());
    };

    const groupedWorkouts = groupWorkouts(workoutsCompleted);

    return (
        <div>
            {groupedWorkouts.length === 0 ? (
                <p>No completed workouts yet.</p>
            ) : (
                <div>
                    <Button onClick={clearWorkoutHistory} style={{ backgroundColor: 'maroon', minWidth: '180px' }}>
                        Clear Workout History
                    </Button>
                    <div>
                        {groupedWorkouts.map(({ workout, count }, index) => (
                            <div key={index} style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Workout {index + 1} {count > 1 && `(x${count})`}
                                </div>
                                <YourWorkoutList timersArray={workout.timers || []} isEditing={false} isWorkoutHistory={true} workoutTitle={workout.title} totalQueueSeconds={totalQueueSeconds} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutHistoryView;
