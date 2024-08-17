import axios from 'axios';
import {useParams } from "react-router-dom";
import React, { useState ,useEffect } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the ellipsis-vertical and trash icons
import 'reactjs-popup/dist/index.css'; // Import Popup styles
import '../assets/css/UploadQuotation.css'; // Import CSS file for additional styling
import FolderList from './Folders';

export default function FolderCreator({isOffcanvasOpen}) {
  const [selectedYear, setSelectedYear] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [data, setData] = useState([]);
  const isButtonDisabled = !selectedYear;
  const { username } = useParams();
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
  const AppStyle = {
    position:"relative",
    top:"-100px",
    left : isOffcanvasOpen ? '0px': '0%'  ,
    width: isOffcanvasOpen ? 'calc(100% - 260px)': '100%'  ,
    transition: 'all 0.5s ease',
    zIndex: 999,
  };
  const handleCreateFolder = async () => {
    try {
      console.log(selectedYear);
      console.log(username);
      const response = await axios.post('http://localhost:8000/add_req/', { selectedYear ,username ,folderName });
      setData(response.data);
      console.log(response.data)
    }
    catch (error) {
        window.alert('Error fetching budget data:', error);
    }
    // // Code to create a new folder
    // console.log('Creating folder...');
    // setCreatedFolders([...createdFolders, folderName]);
    // setFolderName(''); // Reset folder name input
    // setShowPopup(false);
  };
  useEffect(() => {
    fetchData();
    }, []);
  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/dropdown/'); // endpoint of dropdown
        setBudgetData(response.data.slice(3));
    } catch (error) {
        window.alert('Error fetching data:', error);
    }
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

  const handleYearSubmit = async () => {
    try {
        console.log(selectedYear);
        console.log(username);
        const response = await axios.post('http://localhost:8000/get_req/', { selectedYear ,username });
        setData(response.data);
        console.log(response.data)
    }
    catch (error) {
        window.alert('Error fetching budget data:', error);
    }
};

  return (
    <div className="folder-creator">
      <div className="dropdown">
        <button  onClick={() => setSelectedOption(selectedOption === 'newFolder' ? '' : 'newFolder')}>
          NEW
        </button>
        <label htmlFor="language" className='c-FinanYear'>Financial Year :</label>
        <select
            class="c-year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="" disabled >Select an option</option>
            {budgetData.map((item, index) => (
            <option key={index} value={item}>
                {item}
            </option>
            ))}
        </select>
        <button class="c-viewbutton" onClick={handleYearSubmit} disabled={isButtonDisabled}>View</button>
        <br></br>
        <FolderList data={data}/>
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

