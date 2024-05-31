import React from 'react';

const searchInput = ({ onChange }) => {
    const handleInputChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            onChange={handleInputChange}
        />
    );
};

export default searchInput;