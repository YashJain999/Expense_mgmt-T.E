import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Dropdown, DropdownButton, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function FolderCreator() {
  const [selectedYear, setSelectedYear] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingFolder, setRenamingFolder] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [file, setFile] = useState(null);
  const [fileCards, setFileCards] = useState([]);


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
    event.stopPropagation();
    if (action === 'rename') {
      setRenamingFolder(folderIndex);
      setNewFolderName(folders[folderIndex]);
      setShowRenameModal(true);
    } else if (action === 'delete') {
      handleDelete(folderIndex);
    }
  };

  const handleFolderDoubleClick = (folderName) => {
    setFolders([]); // Clear folder list to simulate navigation
    setCurrentFolder(folderName); // Set the current folder
    setIsDropdownDisabled(true); // Disable the dropdown
  };

  const handleHomeClick = () => {
    setCurrentFolder(null);
    setSelectedYear('');
    setFolders([]);
    setIsDropdownDisabled(false); // Re-enable dropdown
  };
  
  // Handle file upload to create a new file card
const handleFileUpload = async () => {
  if (!selectedYear || !file || !newFileName || !vendorName) {
    alert('Please fill all fields and select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('username', username);
  formData.append('selectedYear', selectedYear);
  formData.append('file',file);

  axios.post('http://localhost:8000/upload_quotation/', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => {
    if(response.status === 200){
      alert('File uploaded successfully');
    }
    else{
      alert('Error uploading file');
    }
  })
  .catch(error => {
    console.error(error);
  });


  //Create a new file card
  const newFileCard = {
    name: newFileName,
  };

  // Update file cards state
  setFileCards([...fileCards, newFileCard]);

  // Reset fields and close the modal
  setNewFileName('');
  setVendorName('');
  setFile(null);
  setShowFileModal(false);
};

  const handleYearClick = async () => {
    if (selectedYear) {
      await fetchFolders();
      setCurrentFolder(null); // Reset folder view
      setIsDropdownDisabled(false); // Re-enable dropdown
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
    else if (eventKey === 'addFile') setShowFileModal(true); // Open File Modal
  }}
>
  <Dropdown.Item eventKey="addFile">Add New File</Dropdown.Item>
  <Dropdown.Item eventKey="addFolder">Add New Folder</Dropdown.Item>
</DropdownButton>

        <select
  className="w-25 bg-primary text-white h5 border px-2"
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
  disabled={isDropdownDisabled}
  style={{ display: isDropdownDisabled ? 'none' : 'block' }} // Hide dropdown if a folder is selected
>
  <option value="" disabled>Financial Year</option>
  {fetchedData.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))}
</select>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumb className="mt-3">
  <Breadcrumb.Item href="#" onClick={handleHomeClick}>Home</Breadcrumb.Item>
  {selectedYear && (
    <Breadcrumb.Item href="#" onClick={handleYearClick}>
      {selectedYear}
    </Breadcrumb.Item>
  )}
  {currentFolder && <Breadcrumb.Item active>{currentFolder}</Breadcrumb.Item>}
</Breadcrumb>

      <Row className="folder-list mt-4">
        {folders.map((folder, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
            <Card 
              style={{ width: '160px', position: 'relative' }} 
              className="text-center clickable-card"
              onDoubleClick={() => handleFolderDoubleClick(folder)}
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
      <Form.Group className="mb-3" controlId="formFolderName">
        <Form.Label>Folder Name</Form.Label>
        <Form.Control type="text" placeholder="Enter folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} style={{width: '50%'}}/>
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

        {/*File upload MOdal*/}
        <Modal show={showFileModal} onHide={() => setShowFileModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Upload File</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form >
      <Form.Group className="mb-3" controlId="formFileName">
        <Form.Label>File Name</Form.Label>
        <Form.Control className="w-100 border  border-secondary rounded-end" type="text" placeholder="Enter file name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formVendorName">
        <Form.Label>Vender Name</Form.Label>
        <Form.Control className="w-100 border  border-secondary rounded-end" type="text" placeholder="Enter Vendor name" value={vendorName} onChange={(e) => setVendorName(e.target.value)}   />
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formFileUpload">
        <Form.Label>Upload Pdf File</Form.Label>
        <Form.Control className="w-100 border  border-secondary rounded-end" type="file" accept=".pdf" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
      </Form.Group>
    </Form>
      
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowFileModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleFileUpload}>
      Save
    </Button>
  </Modal.Footer>
</Modal>

{/*display file cards*/}
<div className="file-cards mt-4">
  {fileCards.map((fileCard, index) => (
    <Card key={index} className="mb-3">
      <Card.Body>
        <Card.Title>{fileCard.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Vendor: {fileCard.vendor}</Card.Subtitle>
        <Card.Text>
          Item: {fileCard.item} <br />
          Quantity: {fileCard.quantity} <br />
          Price: {fileCard.price} <br />
          File: {fileCard.file}
        </Card.Text>
      </Card.Body>
    </Card>
  ))}
</div>

      {/* Rename Folder Modal */}
      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary font-weight-bold">Rename Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formRenameFolder">
        <Form.Label>Folder Name</Form.Label>
        <Form.Control type="text" placeholder="Rename folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} style={{width: '50%'}}/>
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