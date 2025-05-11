import { useState } from 'react';

const WorkoutDetails = ({ workout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editWorkout, setEditWorkout] = useState({
        title: workout.title,
        load: workout.load,
        reps: workout.reps,
    });
    const [error, setError] = useState('');

    const handleDeleteClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (response.ok) {
            window.location.reload();
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setError('');
    };

    const handleSaveClick = async () => {
        // Validate inputs
        if (!editWorkout.title || !editWorkout.load || !editWorkout.reps) {
            setError('All fields are required.');
            return;
        }

        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editWorkout),
        });
        const json = await response.json();

        if (response.ok) {
            window.location.reload();
        } else {
            console.error(json.error);
            setError('Failed to update the workout. Please try again.');
        }
    };

    return (
        <div className="workout-details">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editWorkout.title}
                        onChange={(e) => setEditWorkout({ ...editWorkout, title: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editWorkout.load}
                        onChange={(e) => setEditWorkout({ ...editWorkout, load: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editWorkout.reps}
                        onChange={(e) => setEditWorkout({ ...editWorkout, reps: e.target.value })}
                    />
                    <button onClick={handleSaveClick} style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer' }}>
                        Save
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            ) : (
                <>
                    <h4>{workout.title}</h4>
                    <p>
                        <strong>Load (kg): </strong>
                        {workout.load}
                    </p>
                    <p>
                        <strong>Reps: </strong>
                        {workout.reps}
                    </p>
                    <p>{new Date(workout.createdAt).toLocaleString('en-US')}</p>
                </>
            )}
            {!isEditing && (
                <button
                    style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', marginRight: '5px' }}
                    onClick={handleEditClick}
                >
                    Edit
                </button>
            )}
            <button
                style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer' }}
                onClick={handleDeleteClick}
            >
                Delete
            </button>
        </div>
    );
};

export default WorkoutDetails;
