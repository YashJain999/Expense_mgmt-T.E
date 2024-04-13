import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the ellipsis-vertical and trash icons
import 'reactjs-popup/dist/index.css'; // Import Popup styles
import '../assets/css/UploadQuotation.css'; // Import CSS file for additional styling

function FolderCreator() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [folderName, setFolderName] = useState('');
  const [createdFolders, setCreatedFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState('');

  const handleOptionSelect = (option) => {
    if (option === 'newFolder') {
      setShowPopup(true);
    }
    setSelectedOption('');
  };

  const handleCreateFolder = () => {
    // Code to create a new folder
    console.log('Creating folder...');
    setCreatedFolders([...createdFolders, folderName]);
    setFolderName(''); // Reset folder name input
    setShowPopup(false);
  };

  const handleFolderClick = (index) => {
    setSelectedFolder(index);
    setEditedFolderName(createdFolders[index]);
  };

  const handleFolderNameUpdate = (index) => {
    const updatedFolders = [...createdFolders];
    updatedFolders[index] = editedFolderName;
    setCreatedFolders(updatedFolders);
    setSelectedFolder(null);
  };

  const handleFolderDelete = (index) => {
    const updatedFolders = [...createdFolders];
    updatedFolders.splice(index, 1);
    setCreatedFolders(updatedFolders);
  };

  const options = [{ value: 'newFolder', label: 'Create New Folder' }];

  return (
    <div className="folder-creator">
      <div className="dropdown">
        <button className="dropdown-blue" onClick={() => setSelectedOption(selectedOption === 'newFolder' ? '' : 'newFolder')}>
          NEW
        </button>
        <div className={`dropdown-content ${selectedOption === 'newFolder' ? 'show' : ''}`}>
          {options.map(option => (
            <button
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          closeOnDocumentClick={false}
          modal
        >
          <div className="popup">
            <button className="close-button" onClick={() => setShowPopup(false)}>&times;</button>
            {/* <h2 className='folder-text'>Create New Folder</h2> */}
            <input
              type="text"
              placeholder="Name of the folder"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleCreateFolder}>Create Folder</button>
          </div>
        </Popup>
      )}
      {/* Display the new folder icons with folder names */}
      <div className='folder-area'>
        <div className="folder-icons">
          {createdFolders.map((folder, index) => (
            <div key={index} className="folder-container">
              <div className="new-folder-icon">
                <FontAwesomeIcon icon={faFolder} size="2x" />
                <FontAwesomeIcon icon={faEllipsisV} size="2x" className="ellipsis-icon" onClick={() => handleFolderDelete(index)} />
                <span className="folder-name" onClick={() => handleFolderClick(index)}>{folder}</span>
                {selectedFolder === index && (
                  <input
                    type="text"
                    className="edit-folder-input"
                    value={editedFolderName}
                    onChange={(e) => setEditedFolderName(e.target.value)}
                    onBlur={() => handleFolderNameUpdate(index)}
                    autoFocus
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderCreator;
