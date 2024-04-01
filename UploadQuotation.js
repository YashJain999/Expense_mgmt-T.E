import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import 'reactjs-popup/dist/index.css'; // Import Popup styles
import '../assets/css/UploadQuotation.css'; // Import CSS file for additional styling

function FolderCreator() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [folderName, setFolderName] = useState('');
  const [createdFolders, setCreatedFolders] = useState([]);

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
            <input
              type="text"
              placeholder="sample"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleCreateFolder}>Create Folder</button>
          </div>
        </Popup>
      )}
      {/* Display the new folder icons with folder names */}
      <div className="folder-icons">
        {createdFolders.map((folder, index) => (
          <div key={index} className="folder-container">
            <div className="new-folder-icon">
              <FontAwesomeIcon icon={faFolder} size="2xl" />
              <span className="folder-name">{folder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderCreator;
