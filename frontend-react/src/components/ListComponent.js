import React, { useState } from 'react';

function ListComponent({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const resetSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {selectedItem === null ? (
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(index)}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button onClick={resetSelectedItem}>Back to Parent List</button>
          <ul>
            <li>{items[selectedItem]}</li>
            {/* You can render the new list items here */}
            <li>New Item 1</li>
            <li>New Item 2</li>
            {/* Add more items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListComponent;
