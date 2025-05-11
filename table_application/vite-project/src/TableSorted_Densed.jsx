import { useState, useEffect } from 'react';
import TableRowNew from './TableRowNew';
import SortIcon from './SortIcon';
import AddItemModal from './AddItemModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SearchBar from './SearchBar';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TableComponent = () => {
    const [data, setData] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [found, setFound] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ monthName: '', itemName: '' });
    const [newItem, setNewItem] = useState({ monthName: '', itemName: '', itemData: '' });

    useEffect(() => {
        fetch('/sampleData.json')
            .then(response => response.json())
            .then(data => setData(data.months))
            .catch(error => console.error('Error fetching the JSON:', error));
    }, []);

    const sortData = (monthIndex, columnIndex) => {
        const sortedData = [...data];
        sortedData[monthIndex].datasets.sort((a, b) => a.data[columnIndex] - b.data[columnIndex]);
        setData(sortedData);
    };

    const sortAlphabetically = (monthIndex) => {
        const sortedData = [...data];
        sortedData[monthIndex].datasets.sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedData);
    };

    const searchForItem = (monthName, itemName) => {
        const month = data.find((month) => month.name === monthName);
        if (!month) {
            return null;
        }

        const foundItem = month.datasets.find((dataset) => dataset.name === itemName);
        if (!foundItem) {
            return null;
        }

        return foundItem;
    };

    const addItem = (dataToAdd) => {
        const newData = [...data];
        const monthIndex = newData.findIndex((month) => month.name === dataToAdd.name);
        if (monthIndex === -1) {
            newData.push({ name: dataToAdd.name, datasets: dataToAdd.datasets });
        } else {
            newData[monthIndex].datasets.push(...dataToAdd.datasets);
        }
        setData(newData);
        setShowAddModal(false);
    };

    const confirmDeleteItem = (monthName, itemName) => {
        setItemToDelete({ monthName, itemName });
        setShowDeleteModal(true);
    };

    const deleteItem = () => {
        const { monthName, itemName } = itemToDelete;
        const newData = [...data];
        const monthIndex = newData.findIndex((month) => month.name === monthName);
        if (monthIndex !== -1) {
            const updatedDatasets = newData[monthIndex].datasets.filter((dataset) => dataset.name !== itemName);
            newData[monthIndex].datasets = updatedDatasets;
            setData(newData);
        }
        setShowDeleteModal(false);
    };

    const editItem = (monthName, itemName, newData) => {
        const newDataCopy = [...data];
        const monthIndex = newDataCopy.findIndex((month) => month.name === monthName);
        if (monthIndex !== -1) {
            const datasetIndex = newDataCopy[monthIndex].datasets.findIndex((dataset) => dataset.name === itemName);
            if (datasetIndex !== -1) {
                newDataCopy[monthIndex].datasets[datasetIndex].data = newData;
                setData(newDataCopy);
            }
        }
    };

    const handleAddItem = () => {
        const itemData = newItem.itemData.split(',').map(Number);
        const dataToAdd = {
            name: newItem.monthName,
            datasets: [{ name: newItem.itemName, data: itemData }],
        };
        addItem(dataToAdd);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container bg-dark text-white p-3 rounded">
            {data.map((month, monthIndex) => (
                <div key={monthIndex}>
                    <h2>{month.name}</h2>
                    <div className="table-responsive">
                        <table border="1" className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>
                                        Dataset Name
                                        <SortIcon onClick={() => sortAlphabetically(monthIndex)} />
                                    </th>
                                    {Array.from({ length: 7 }, (_, index) => (
                                        <th key={index}>
                                            Data {index + 1}
                                            <SortIcon onClick={() => sortData(monthIndex, index)} />
                                        </th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {month.datasets.map((dataset, datasetIndex) => (
                                    <TableRowNew
                                        key={datasetIndex}
                                        dataset={dataset}
                                        monthName={month.name}
                                        deleteItem={confirmDeleteItem}
                                        editItem={editItem}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-center mb-3">
                <Button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
                    Add New Item
                </Button>
            </div>

            <AddItemModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                newItem={newItem}
                setNewItem={setNewItem}
                handleAddItem={handleAddItem}
            />

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                itemToDelete={itemToDelete}
                deleteItem={deleteItem}
            />

            <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                searchForItem={searchForItem}
                setFound={setFound}
                found={found}
            />
        </div>
    );
};

export default TableComponent;
