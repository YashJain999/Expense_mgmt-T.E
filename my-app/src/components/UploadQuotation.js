import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import '../assets/css/UploadQuotation.css';
import { Dropdown, DropdownButton, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function FolderCreator() {
  const [selectedYear, setSelectedYear] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingFolder, setRenamingFolder] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleSelect = (eventKey) => {
    if (eventKey === 'addFile') {
      console.log('Add New File selected');
    } else if (eventKey === 'addFolder') {
      setShowModal(true);
    }
  };

  const handleCreateFolder = () => {
    setFolders([...folders, newFolderName]);
    setNewFolderName('');
    setShowModal(false);
  };

  const handleRename = () => {
    setFolders(folders.map((folder, index) => 
      index === renamingFolder ? newFolderName : folder
    ));
    setNewFolderName('');
    setRenamingFolder(null);
    setShowRenameModal(false);
  };

  const handleIconClick = (folderIndex, action, event) => {
    event.stopPropagation(); // Prevent card click event
    if (action === 'rename') {
      setRenamingFolder(folderIndex);
      setNewFolderName(folders[folderIndex]);
      setShowRenameModal(true);
    } else if (action === 'delete') {
      setFolders(folders.filter((_, index) => index !== folderIndex));
    }
  };

  const handleCardClick = (folder) => {
    alert(`Clicked on folder: ${folder}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dropdown/');
      setFetchedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedYear !== '') {
      handleYearSubmit();
    }
  }, [selectedYear]);

  const handleYearSubmit = async () => {
    try {
      console.log("Handle year submit clicked");
    } catch (error) {
      console.error('Error fetching budget details:', error);
    }
  };

  return (
    <div className="folder-creator">
      <div className='d-flex flex-row justify-content-between px-3 mt-2'>
        <DropdownButton
          id="dropdown-basic-button"
          title={
            <>
              <FontAwesomeIcon icon={faPlus} /> New
            </>
          }
          variant="primary"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="addFile">Add New File</Dropdown.Item>
          <Dropdown.Item eventKey="addFolder">Add New Folder</Dropdown.Item>
        </DropdownButton>

        <select
          className="w-25 bg-primary text-white h5 border px-2"
          aria-labelledby="dropdownMenuButton2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>Financial Year</option>
          {fetchedData.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <Row className="folder-list mt-4">
        {folders.map((folder, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
            <Card 
              style={{ width: '160px', position: 'relative' }} 
              className="text-center clickable-card"
              onClick={() => handleCardClick(folder)}
            >
              <Card.Body>
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" />
                <Card.Title className="text-truncate">{folder}</Card.Title>

                {/* Custom Dropdown Button */}
                <Dropdown className="position-absolute" style={{ bottom: '0', right: '0' }}>
                  <Dropdown.Toggle as={Button} variant="link" className="custom-options-icon">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => handleIconClick(index, 'rename', e)}>Rename</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleIconClick(index, 'delete', e)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Create Folder Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary font-weight-bold">Create New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFolderName">
              <Form.Label className="font-weight-bold text-dark">Folder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter folder name"
                value={newFolderName}
                className="w-75 p-2 border-primary"  
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateFolder}>
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rename Folder Modal */}
      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary font-weight-bold">Rename Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRenameFolder">
              <Form.Label className="font-weight-bold text-dark">New Folder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new folder name"
                value={newFolderName}
                className="w-75 p-2 border-primary"  
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRenameModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRename}>
            Rename Folder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
