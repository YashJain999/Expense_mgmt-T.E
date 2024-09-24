import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Dropdown, DropdownButton, Card, Button, Modal, Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile, faPlus, faFolder, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/UploadQuotation.css";

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
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [file, setFile] = useState(null);
  const [fileCards, setFileCards] = useState([]);
  const [modalMode, setModalMode] = useState('upload');
  const [selectedItem, setSelectedItem] = useState(null);
  const [warrantyDate, setWarrantyDate] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    // Confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this folder?');
  
    if (!confirmDelete) {
      // If the user clicks "Cancel", do nothing and return
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

  const handleFileOperation = (folderIndex, action, event) => {
    event.stopPropagation();
    if (action === 'update') {
      // setUpdateFile(folderIndex);
      setModalMode('update');
      setShowFileModal(true);
      handleUpdateFile([folderIndex])
    } else if (action === 'delete') {
      handleDelete_file(folderIndex);
    }
  };

  const handleUpdateFile = async (folderIndex) => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/get_file_item_details/${selectedYear}/${username}/${currentFolder}/${fileCards[folderIndex].pdf_id}/`);
      const { items, pdfs } = response.data;
      console.log(items, pdfs)
      if (pdfs && pdfs.length > 0) {
        setNewFileName(pdfs[0].file_name || '');
        setVendorName(pdfs[0].vendor_name || '');
      }
      const flattenedItems = items.flat().map(item => ({
        name: item.item_name,
        quantity: item.quantity,
        price: item.price,
        warranty_date: item.warranty_date
      }));
      setItems(flattenedItems);
    }
    catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleDelete_file = async (folderIndex) => {
    if (!selectedYear) {
      alert('Please select a financial year.');
      return;
    }
    // Confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this folder?');
  
    if (!confirmDelete) {
      // If the user clicks "Cancel", do nothing and return
      return;
    }
    try {
      await axios.post('http://localhost:8000/delete_file/', {
        selectedYear,
        username,
        req_name: currentFolder,
        filename: fileCards[folderIndex]
      });
      // setFileCards([file.filter((_, index) => index !== folderIndex)]);
      setFileCards([]);
      // After successful upload, call handleFolderDoubleClick to refresh the file cards
      await handleFolderDoubleClick(currentFolder);
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

  const handleFolderDoubleClick = async (folderName) => {
    setCurrentFolder(folderName); // Set the current folder
    setIsDropdownDisabled(true); // Disable the dropdown
    setFolders([]);

    // Make API call to fetch PDFs for the selected folder and year
    try {
      const response = await axios.post('http://localhost:8000/fetch_req_data/', {
        selectedYear,
        username,
        folderName,
      });
      if (response.data.status === 404) {
        alert('file is not');
      }
      setFileCards(response.data["pdfs"]); // Update file cards with fetched PDF data
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const handleHomeClick = () => {
    setCurrentFolder(null);
    setSelectedYear('');
    setFolders([]);
    setIsDropdownDisabled(false); // Re-enable dropdown
    setFileCards([]);
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
    formData.append('warranty_date', warrantyDate);

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
    if (itemName && itemQty && itemPrice && warrantyDate) {
      if (selectedItem) {
        // Update existing item
        setItems(prevItems =>
          prevItems.map(item =>
            item === selectedItem
              ? { ...item, name: itemName, quantity: parseFloat(itemQty), price: parseFloat(itemPrice), warranty_date: warrantyDate }
              : item
          )
        );
        setSelectedItem(null); // Clear selection
      } else {
        // Add new item
        const newItem = {
          name: itemName,
          quantity: parseFloat(itemQty),  // Ensure quantity is a number
          price: parseFloat(itemPrice),  
          warranty_date: warrantyDate,
           // Ensure price is a number
        };
        console.log(warrantyDate) 
        setItems([...items, newItem]);
      }
      setItemName('');
      setItemQty('');
      setItemPrice('');
      setWarrantyDate('');
    } else {
      alert('Please fill all item fields before adding.');
    }
  };

  const handleOpenPdf = (pdfId) => {
    const pdfUrl = `http://localhost:8000/get_pdf/${pdfId}/`;
    window.open(pdfUrl, '_blank');
  };

  const handleItemEditClick = (item) => {
    setSelectedItem(item);
    console.log(item)
    setItemName(item.name);
    setItemQty(item.quantity);
    setItemPrice(item.price);
    setWarrantyDate(item.warranty_date);

  };

  const handleItemDeleteClick = (itemToDelete) => {
    console.log('Delete clicked:', itemToDelete);

    // Filter out the item to be deleted
    const updatedItems = items.filter(item => item !== itemToDelete);
    
    // Update the state with the filtered items
    setItems(updatedItems);

  };

  const handleFileUpdate = async () => {
    if (!selectedYear || !vendorName) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('selectedYear', selectedYear);
    formData.append('items', JSON.stringify(items));
    formData.append('vendor_name', vendorName);
    formData.append('file_name', newFileName);
    formData.append('req_name', currentFolder);


    try {
      const response = await axios.post('http://localhost:8000/update_file_quotation/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        alert('value updated successfully');

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
            if (eventKey === 'addFolder') {
              setShowModal(true);
            } else if (eventKey === 'addFile') {
              setModalMode('upload');
              setShowFileModal(true);
              setNewFileName('');  
              setVendorName('');  
              setItems([]);         
            }
          }}
        >
          <Dropdown.Item eventKey="addFile" disabled={!currentFolder}>Add New File</Dropdown.Item>
          <Dropdown.Item eventKey="addFolder" disabled={!selectedYear || currentFolder}>Add New Folder</Dropdown.Item>
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

      {selectedYear && folders.length > 0 && (
          <span className="d-block fs-4 fw-bold mb-1 text-dark text-decoration-underline">Requirements for {selectedYear}</span>
        )}

      <Row className="folder-list mt-4">
        {folders.map((folder, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={3} className="d-flex justify-content-center">
            <Card
              style={{ width: '300px', position: 'relative', backgroundColor: '#ffffff' }}
              className="text-center clickable-card folder-card my-3 "
              onDoubleClick={() => handleFolderDoubleClick(folder)}
            >
              <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faFolder} size="2x" className="me-3 text-black" />
                <OverlayTrigger placement="top" overlay={<Tooltip>{folder}</Tooltip>}>
                  <Card.Subtitle
                    className="text-truncate"
                    style={{ cursor: 'pointer', maxWidth: '200px' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                {folder}
                  </Card.Subtitle>
                </OverlayTrigger>
                <Dropdown className="dropdown-arrow position-absolute text-dark" style={{ bottom: '10px', right: '2px' }}>
                <Dropdown.Toggle as={Button} variant="link" className="custom-options-icon">
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
              <Form.Control type="text" placeholder="Enter folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} style={{ width: '50%' }} />
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
    <Modal.Title>{modalMode === 'upload' ? 'Upload File' : 'Update Values'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
          <Form >
            {modalMode === 'upload' && (
               <Form.Group className="mb-3" controlId="formFileName">
               <Form.Label>File Name</Form.Label>
               <Form.Control className="w-100 border border-secondary rounded-end" type="text" placeholder="Enter file name" value={newFileName || ''} onChange={(e) => setNewFileName(e.target.value)} />
             </Form.Group>
            )}
           
            <Form.Group className="mb-3" controlId="formVendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control className="w-100 border border-secondary rounded-end" type="text" placeholder="Enter Vendor name" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
            </Form.Group>

            {modalMode === 'upload' && (
        <Form.Group className="mb-3" controlId="formFileUpload">
          <Form.Label>Upload Pdf File</Form.Label>
          <Form.Control
            className="w-100 border border-secondary rounded-end"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
      )}
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
                  type="number"
                  placeholder="Enter price"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Warranty Date</Form.Label>
                <Form.Control
                  className="w-100 border border-secondary rounded-end"
                  type="date"
                  placeholder="Enter Warranty Date"
                  value={warrantyDate}
                  onChange={(e) => setWarrantyDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddItem}>
                <FontAwesomeIcon icon={faPlus} /> Add Item
              </Button>

              {/* Displaying the list of added items */}
              <div className="mt-3">
                <h5>Items List</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Warranty Date</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.warranty_date}</td>
                        <td><FontAwesomeIcon icon={faEdit} onClick={() => handleItemEditClick(item)} /> </td>
                        <td><FontAwesomeIcon icon={faTrash} onClick={() => handleItemDeleteClick(item)} /> </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          </Form>
        </Modal.Body>

        {/* // Modal footer buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={modalMode === 'upload' ? handleFileUpload : handleFileUpdate}>
      {modalMode === 'upload' ? 'Upload' : 'Update'}
    </Button>
        </Modal.Footer>
      </Modal>

      {/*file cards */}
      <div>
      <div className="file-folder-list d-block fs-4 fw-bold mb-1 text-dark text-decoration-underline">
      {fileCards.length > 0 && (
          <span className="text-muted d-block mb-3">
            Quotations for {selectedYear}
          </span>
        )}
        </div>
      <Row>
      {fileCards.map((fileCard, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={3} className="d-flex justify-content-center">
            <Card
              style={{ width: '230px', position: 'relative' }}
                className="text-center clickable-card file-card p-3 shadow-sm rounded-4 border border-secondary-subtle text-bg-light my-3"
              onDoubleClick={() => handleOpenPdf(fileCard.pdf_id)}
            >
              <Card.Body>
              <FontAwesomeIcon icon={faFile} size="3x" className="mb-3" />
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{fileCard.file_name}</Tooltip>}
                >
                  <Card.Title
                    className="text-truncate fs-7 text-dark mb-2"
                    style={{ cursor: 'pointer', maxWidth: '200px' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {fileCard.file_name}
                  </Card.Title>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{fileCard.vendor_name}</Tooltip>}
                >
                  <Card.Subtitle
                    className="text-muted text-truncate fs-6 mb-3"
                    style={{ cursor: 'pointer', maxWidth: '200px' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    Vendor: {fileCard.vendor_name}
                  </Card.Subtitle>
                </OverlayTrigger>
                <Dropdown className="position-absolute" style={{ bottom: '0', right: '0' }}>
                    <Dropdown.Toggle as={Button} variant="link" className="custom-options-icon">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(e) => handleFileOperation(index, 'update', e)}>Update</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => handleFileOperation(index, 'delete', e)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
              <Form.Control type="text" placeholder="Rename folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} style={{ width: '50%' }} />
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