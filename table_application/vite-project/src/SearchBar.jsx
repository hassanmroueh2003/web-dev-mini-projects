import { useState } from 'react';

const SearchBar = ({ searchInput, setSearchInput, searchForItem, setFound, found }) => {
    const [localSearchInput, setLocalSearchInput] = useState(searchInput);

    const handleSearch = () => {
        const [monthName, itemName] = localSearchInput.split(', ');
        setFound(searchForItem(monthName.trim(), itemName.trim()));
    };

    const handleReset = () => {
        setFound(false);
        setSearchInput('');
        setLocalSearchInput('');
    };

    return (
        <div className="d-flex justify-content-center">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Month, Item name"
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-primary btn-sm">
                Search
            </button>
            {found && <p>Found: {`${found.name}: ${found.data.join(', ')}`}</p>}
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
                Reset search
            </button>
        </div>
    );
};

export default SearchBar;
