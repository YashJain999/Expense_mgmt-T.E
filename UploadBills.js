import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import '../assets/css/UploadQuotation.css';  // Assuming you have custom CSS
import { Dropdown, DropdownButton, Card, Row, Col, Breadcrumb, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder, faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import PDF and Trash icons

export default function FolderCreator() {
  const [selectedYear, setSelectedYear] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isNewButtonDisabled, setIsNewButtonDisabled] = useState(true);
  const [currentFolder, setCurrentFolder] = useState('');
  const [date, setDate] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productPurchased, setProductPurchased] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  
  // State to hold files by year and folder
  const [filesByYearAndFolder, setFilesByYearAndFolder] = useState({});

  const folderNames = [
    "Laboratory Consumables",
    "Laboratory Equipment",
    "Maintenance and Spares",
    "Miscellaneous expenses",
    "Research and Development",
    "Software",
    "Training and Travel"
  ];

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
      setFolders(folderNames);
      setCurrentFolder('');
    }
  }, [selectedYear]);

  const handleFolderClick = (folder) => {
    setIsNewButtonDisabled(false);
    setCurrentFolder(folder);
  };

  const handleYearClick = () => {
    setCurrentFolder('');
    setIsNewButtonDisabled(true);
  };

  const handleHomeClick = () => {
    setSelectedYear('');
    setFolders([]);
    setCurrentFolder('');
    setIsNewButtonDisabled(true);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFileSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const newFile = {
      vendorName,
      totalAmount,
      quantity,
      productPurchased,
      pdfFile,
    };
  
    // Create a unique key for the selected year and folder
    const key = `${selectedYear}-${currentFolder}`;
  
    // Update the files state
    setFilesByYearAndFolder((prev) => {
      const updatedFiles = { ...prev };
      if (!updatedFiles[key]) {
        updatedFiles[key] = [];
      }
      updatedFiles[key] = [...updatedFiles[key], newFile]; // Add the new file to the list
      return updatedFiles;
    });
  
    handleCloseModal(); // Close the modal
  
    // Reset form fields to clear out the inputs
    setVendorName('');
    setTotalAmount('');
    setQuantity('');
    setProductPurchased('');
    setPdfFile(null);
  };
  

  // Function to delete a file
  const handleDeleteFile = (index) => {
    const key = `${selectedYear}-${currentFolder}`;
    setFilesByYearAndFolder((prev) => {
      const updatedFiles = { ...prev };
      updatedFiles[key].splice(index, 1); // Remove the file at the specified index
      return updatedFiles;
    });
  };

  return (
    <div className="folder-creator">
      <div className='d-flex flex-row justify-content-between px-3 mt-2'>
        <DropdownButton
          id="dropdown-basic-button"
          title={<><FontAwesomeIcon icon={faPlus} /> New</>}
          variant="primary"
          disabled={isNewButtonDisabled}
          onSelect={handleShowModal} // Show modal on select
        >
          <Dropdown.Item eventKey="addFile">Add Bill Details</Dropdown.Item>
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

      <Breadcrumb className="mt-3">
        <Breadcrumb.Item href="#" onClick={handleHomeClick}>Home</Breadcrumb.Item>
        {selectedYear && (
          <Breadcrumb.Item href="#" onClick={handleYearClick}>
            {selectedYear}
          </Breadcrumb.Item>
        )}
        {currentFolder && <Breadcrumb.Item active>{currentFolder}</Breadcrumb.Item>}
      </Breadcrumb>

      {selectedYear && !currentFolder && (
  <Row className="folder-list mt-4">
    {folders.map((folder, index) => (
      <Col key={index} xs={12} sm={6} md={3} lg={3} className="d-flex justify-content-center">
        <Card
          style={{
            width: '240px',
            position: 'relative',
            backgroundColor: `hsl(${index * 40}, 80%, 90%)`, // Unique pastel background color for each card
            border: 'none', // Remove default border
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow for a 3D effect
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
            marginTop: '20px', // Increased space between top folders
          }}
          className="text-center clickable-card"
          onClick={() => handleFolderClick(folder)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'; // Zoom on hover
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)'; // Stronger shadow on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'; // Reset scale
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'; // Reset shadow
          }}
        >
          <Card.Body>
            <FontAwesomeIcon
              icon={faFolder}
              size="3x"
              className="mb-3"
              style={{ color: `hsl(${index * 40}, 60%, 50%)` }} // Colorful folder icons
            />
            <Card.Title
              className="folder-title text-truncate"
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: 'hsl(220, 15%, 30%)', // Darker text for better contrast
              }}
            >
              {folder}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
)}


      {currentFolder && (
        <div className="mt-4">
          <h5>You are inside the folder: {currentFolder}</h5>
          {/* Display created files in card format */}
          {filesByYearAndFolder[`${selectedYear}-${currentFolder}`] && filesByYearAndFolder[`${selectedYear}-${currentFolder}`].length > 0 && (
            <Row className="file-list mt-4">
              {filesByYearAndFolder[`${selectedYear}-${currentFolder}`].map((file, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
                  <Card 
                    style={{ width: '160px', position: 'relative' }} 
                    className="text-center clickable-card"
                  >
                    <Card.Body>
                      <FontAwesomeIcon icon={faFilePdf} size="3x" className="mb-3" />
                      <Card.Title className="file-title text-truncate" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {file.vendorName} - {file.productPurchased}
                      </Card.Title>
                      <Card.Text>
                        Amount: {file.totalAmount} <br />
                        Quantity: {file.quantity}
                      </Card.Text>
                      {file.pdfFile && (
                        <span>
                          <FontAwesomeIcon icon={faFilePdf} className="ml-2" /> {/* PDF icon */}
                          <span className="ml-1">PDF uploaded</span>
                        </span>
                      )}
                      <Button 
                        variant="danger" 
                        className="mt-2" 
                        onClick={() => handleDeleteFile(index)} // Delete file on click
                      >
                        <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      {/* Modal for adding new file */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title className="text-primary">Add Bill Details and PDF</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleFileSubmit}>
      <Form.Group controlId="vendorName">
        <Form.Label className="text-dark">Vendor Name</Form.Label>
        <Form.Control 
          type="text" 
          value={vendorName} 
          onChange={(e) => setVendorName(e.target.value)} 
          required 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '5px', fontSize: '1rem' }} 
        />
      </Form.Group>

      <Form.Group controlId="totalAmount">
        <Form.Label className="text-dark">Total Amount</Form.Label>
        <Form.Control 
          type="number" 
          value={totalAmount} 
          onChange={(e) => setTotalAmount(e.target.value)} 
          required 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '2px', fontSize: '1rem' }} 
        />
      </Form.Group>

      <Form.Group controlId="quantity">
        <Form.Label className="text-dark">Quantity</Form.Label>
        <Form.Control 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '2px', fontSize: '1rem' }} 
        />
      </Form.Group>

      <Form.Group controlId="productPurchased">
        <Form.Label className="text-dark">Product Purchased</Form.Label>
        <Form.Control 
          type="text" 
          value={productPurchased} 
          onChange={(e) => setProductPurchased(e.target.value)} 
          required 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '2px', fontSize: '1rem' }} 
        />
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label className="text-dark">Date</Form.Label>
        <Form.Control 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '2px' }} 
        />
      </Form.Group>

      <Form.Group controlId="pdfFile">
        <Form.Label className="text-dark">Upload PDF</Form.Label>
        <Form.Control 
          type="file" 
          accept="application/pdf" 
          onChange={(e) => setPdfFile(e.target.files[0])} 
          className="mb-3 border-primary rounded-lg p-2" 
          style={{ borderWidth: '2px' }} 
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 rounded-pill">
        Add File
      </Button>
    </Form>
  </Modal.Body>
</Modal>



    </div>
  );
}