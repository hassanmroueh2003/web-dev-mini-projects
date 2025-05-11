import { useState } from 'react';

const TableRowNew = ({ dataset, monthName, deleteItem, editItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(dataset.data);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editItem(monthName, dataset.name, editedData);
        setIsEditing(false);
    };

    const handleChange = (index, value) => {
        const newData = [...editedData];
        newData[index] = Number(value); 
        setEditedData(newData);
    };

    const handleDelete = () => {
        deleteItem(monthName, dataset.name);
    };

    return (
        <tr>
            <td>{dataset.name}</td>
            {dataset.data.map((dataPoint, index) => (
                <td key={index} className="p-1">
                    {isEditing ? (
                        <input
                            type="number"
                            value={editedData[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="form-control form-control-sm"
                            style={{ width: '70px' }} 
                        />
                    ) : (
                        dataPoint
                    )}
                </td>
            ))}
            <td>
                {isEditing ? (
                    <button onClick={handleSave} className="btn btn-success btn-sm me-1">
                        Save
                    </button>
                ) : (
                    <button onClick={handleEdit} className="btn btn-warning btn-sm me-1">
                        Edit
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default TableRowNew;
