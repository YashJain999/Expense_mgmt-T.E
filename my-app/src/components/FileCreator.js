import React, { useState, useParams } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

export default function FileCreator({ currentFolder, selectedYear }) {
    const [showFileModal, setShowFileModal] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [file, setFile] = useState(null);
    const [fileCards, setFileCards] = useState([]);
    const { username } = useParams();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
        formData.append('file', file);
        formData.append('items', JSON.stringify(items));
        formData.append('vendor_name', vendorName);
        formData.append('file_name', newFileName);
        formData.append('req_name', currentFolder);
      
        try {
          const response = await axios.post('http://localhost:8000/upload_quotation/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
      
          if (response.status === 200) {
            alert('File uploaded successfully');
            
            // After successful upload, call handleFolderDoubleClick to refresh the file cards
            await handleFolderDoubleClick(currentFolder);
          } else {
            alert('Error uploading file');
          }
      
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      
        // Reset fields and close the modal
        setNewFileName('');
        setVendorName('');
        setFile(null);
        setShowFileModal(false);
        setItems([]);
      };

  const handleDelete_file = async (folderIndex) => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    }
    try {
      await axios.post('http://localhost:8000/delete_file/', {
        selectedYear,
        username,
        req_name: currentFolder,
        filename:fileCards[folderIndex]
      });
      // setFileCards([file.filter((_, index) => index !== folderIndex)]);
      setFileCards([]);
              // After successful upload, call handleFolderDoubleClick to refresh the file cards
              await handleFolderDoubleClick(currentFolder);
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleCloseModal = () => {
    setShowFileModal(false); // Close the modal
    setItems([]);
  };


  const handleYearClick = async () => {
    if (selectedYear) {
      await fetchFolders();
      setCurrentFolder(null); // Reset folder view
      setIsDropdownDisabled(false); // Re-enable dropdown
      setFileCards([]);
    }
  };

  const handleAddItem = () => {
    if (itemName && itemQty && itemPrice) {
      const newItem = {
        name: itemName,
        quantity: itemQty,
        price: itemPrice,
      };
      // Add the new item to the current year's items
      setItems([...items, newItem]);
      setItemName('');
      setItemQty('');
      setItemPrice('');
    } else {
      alert('Please fill all item fields before adding.');
    }
  };
  const handleOpenPdf = (pdfId) => {
    const pdfUrl = `http://localhost:8000/get_pdf/${pdfId}/`;
      window.open(pdfUrl, '_blank');
  };


  return (
    <>
     {/*File upload MOdal*/}
     <Modal show={showFileModal} onHide={() => setShowFileModal(false)}>
        <Modal.Header closeButton >
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="formFileName">
              <Form.Label>File Name</Form.Label>
              <Form.Control className="w-100 border border-secondary rounded-end" type="text" placeholder="Enter file name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control className="w-100 border border-secondary rounded-end" type="text" placeholder="Enter Vendor name" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFileUpload">
              <Form.Label>Upload Pdf File</Form.Label>
              <Form.Control className="w-100 border border-secondary rounded-end" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
            <>
              <Form.Group className="mb-3" controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  className="w-100 border border-secondary rounded-end"
                  type="text"
                  placeholder="Enter Item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formItemQty">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                  className="w-100 border border-secondary rounded-end"
                  type="number"
                  placeholder="Enter quantity"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Price</Form.Label>
                <Form.Control
                  className="w-100 border border-secondary rounded-end"
                  type="text"
                  placeholder="Enter price"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddItem}>
                <FontAwesomeIcon icon={faPlus} /> Add Item
              </Button>

              {/* Displaying the list of added items */}
              <div className="mt-3">
                <h5>Items List</h5>
                {items.map((item, index) => (
                  <div key={index}>
                    <p>{item.name} - Quantity: {item.quantity}, Price: {item.price}</p>
                  </div>
                ))}
              </div>
            </>
            {/* )} */}
          </Form>
        </Modal.Body>
  {/* // Modal footer buttons */}
  <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="file-folder-list mt-4">
        <Row>
          {fileCards.map((fileCard, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
              <Card
                style={{ width: '160px', position: 'relative' }}
                className="text-center clickable-card"
                onDoubleClick={() => handleOpenPdf(fileCard.pdf_id)} // Handle double-click
              >
                <Card.Body>
                  <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" />
                  <Card.Title className="text-truncate">{fileCard.pdf_name}</Card.Title>
                  <Card.Subtitle className="text-truncate">Vendor: {fileCard.vendor_name}</Card.Subtitle>
                  {fileCard.isOpen && (
                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                      {fileCard.items.map((item, idx) => (
                        <div key={idx}>
                          <strong>Item:</strong> {item.name} <br />
                          <strong>Quantity:</strong> {item.quantity} <br />
                          <strong>Price:</strong> {item.price} <br />
                        </div>
                      ))}
                      <strong>File:</strong> {fileCard.file}
                    </div>
                  )}
                  <Dropdown className="position-absolute" style={{ bottom: '0', right: '0' }}>
                  <Dropdown.Toggle as={Button} variant="link" className="custom-options-icon">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => handleDelete_file(index)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
