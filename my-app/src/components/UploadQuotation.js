import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const { username } = useParams();

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

  const fetchFolders = useCallback(async () => {
    if (selectedYear) {
      try {
        const response = await axios.post('http://localhost:8000/get_req/', {
          selectedYear, 
          username
        });
        setFolders(response.data.map(folder => folder.req_name));
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    }
  }, [selectedYear, username]);

  useEffect(() => {
    fetchFolders();
  }, [selectedYear, fetchFolders]);

  const handleCreateFolder = async () => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/add_req/', {
        selectedYear,
        username,
        req_name: newFolderName
      });
      setFolders([...folders, newFolderName]);
      setNewFolderName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleRename = async () => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/rename_req/', {
        selectedYear,
        username,
        old_name: folders[renamingFolder],
        new_name: newFolderName
      });
      setFolders(folders.map((folder, index) => 
        index === renamingFolder ? newFolderName : folder
      ));
      setNewFolderName('');
      setRenamingFolder(null);
      setShowRenameModal(false);
    } catch (error) {
      console.error('Error renaming folder:', error);
    }
  };

  const handleDelete = async (folderIndex) => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    } 

    try {
      await axios.post('http://localhost:8000/delete_req/', {
        selectedYear,
        username,
        req_name: folders[folderIndex]
      });
      setFolders(folders.filter((_, index) => index !== folderIndex));
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleIconClick = (folderIndex, action, event) => {
    event.stopPropagation(); // Prevent card click event
    if (action === 'rename') {
      setRenamingFolder(folderIndex);
      setNewFolderName(folders[folderIndex]);
      setShowRenameModal(true);
    } else if (action === 'delete') {
      handleDelete(folderIndex);
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
          onSelect={(eventKey) => {
            if (eventKey === 'addFolder') setShowModal(true);
          }}
        >
          <Dropdown.Item eventKey="addFile">Add New File</Dropdown.Item>
          <Dropdown.Item eventKey="addFolder">Add New Folder</Dropdown.Item>
        </DropdownButton>

        <select
          className="w-25 bg-primary text-white h5 border px-2"
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
            >
              <Card.Body>
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" />
                <Card.Title className="text-truncate">{folder}</Card.Title>

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
