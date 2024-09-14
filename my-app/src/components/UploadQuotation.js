import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Dropdown, DropdownButton, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
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
        // setFile(pdfs[0].pdf_file || '');
      }
      const flattenedItems = items.flat().map(item => ({
        name: item.item_name,
        quantity: item.quantity,
        price: item.price
      }));
      setItems(flattenedItems);
      // setPdfs(pdfs);
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
    if (itemName && itemQty && itemPrice) {
      if (selectedItem) {
        // Update existing item
        setItems(prevItems =>
          prevItems.map(item =>
            item === selectedItem
              ? { ...item, name: itemName, quantity: parseFloat(itemQty), price: parseFloat(itemPrice) }
              : item
          )
        );
        setSelectedItem(null); // Clear selection
      } else {
        // Add new item
        const newItem = {
          name: itemName,
          quantity: parseFloat(itemQty),  // Ensure quantity is a number
          price: parseFloat(itemPrice),    // Ensure price is a number
        };
        setItems([...items, newItem]);
      }
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

  const handleItemEditClick = (item) => {
    setSelectedItem(item);
    console.log(item)
    setItemName(item.name);
    setItemQty(item.quantity);
    setItemPrice(item.price);

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
            if (eventKey === 'addFolder') setShowModal(true);
            else if (eventKey === 'addFile') setModalMode('upload'); setShowFileModal(true); setNewFileName('');
            setVendorName(''); setItems([]); // Open File Modal
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

      <Row className="folder-list mt-4">
        {folders.map((folder, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
            <Card
              style={{ width: '200px', position: 'relative',
                backgroundColor: `hsl(${index * 40}, 80%, 90%)`,
                border: 'none', // Remove default border
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow for a 3D effect
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
                marginTop: '20px', // Increased space between top folders
               }}
              className="text-center clickable-card"
              onDoubleClick={() => handleFolderDoubleClick(folder)}
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
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" style={{ color: `hsl(${index * 40}, 60%, 50%)` }} />
                <Card.Title className="text-truncate" style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: 'hsl(220, 15%, 30%)', // Darker text for better contrast
                    }}>{folder}</Card.Title>

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
                        <td><FontAwesomeIcon icon={faEdit} onClick={() => handleItemEditClick(item)} /> </td>
                        <td><FontAwesomeIcon icon={faTrash} onClick={() => handleItemDeleteClick(item)} /> </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          <Button variant="primary" onClick={modalMode === 'upload' ? handleFileUpload : handleFileUpdate}>
      {modalMode === 'upload' ? 'Upload' : 'Update'}
    </Button>
        </Modal.Footer>
      </Modal>

      {/*file cards */}
      
      <div className="file-folder-list mt-4">
        <Row>
          
          {fileCards.map((fileCard, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
              <Card
                style={{ width: '250px', height:'250px',backgroundColor: `hsl(${index * 40}, 80%, 90%)`, // Unique pastel background color for each card
                border: 'none', // Remove default border
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow for a 3D effect
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
                marginTop: '20px', position: 'relative' }}
                className="text-center clickable-card"
                onDoubleClick={() => handleOpenPdf(fileCard.pdf_id)} // Handle double-click
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
                  <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" />
                  <Card.Title className="text-truncate">{fileCard.file_name || 'No file name available'}</Card.Title>
                  <Card.Subtitle className="text-truncate">Vendor: {fileCard.vendor_name}</Card.Subtitle>
                  {fileCard.isOpen && (
                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                      {items.map((item, index) => (
                        <div key={index}>
                          <strong>Item:</strong> {item.name} <br />
                          <strong>Quantity:</strong> {item.quantity} <br />
                          <strong>Price:</strong> {item.price} <br />
                        </div>
                      ))}
                    </div>
                  )}
                  <Dropdown className="position-absolute" style={{ bottom: '0', right: '0' }}>
                    <Dropdown.Toggle as={Button} variant="link" className="custom-options-icon">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Dropdown.Item onClick={(e) => handleDelete_file(index)}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleUpdate_file(index)}>Delete</Dropdown.Item> */}
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