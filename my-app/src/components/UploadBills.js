import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/UploadQuotation.css';  // Assuming you have custom CSS
import { Dropdown, DropdownButton, Card, Row, Col, Breadcrumb, Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolder, faFilePdf, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import PDF and Trash icons

export default function FolderCreator() {
    const [selectedYear, setSelectedYear] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    const [folders, setFolders] = useState([]);
    const [isNewButtonDisabled, setIsNewButtonDisabled] = useState(true);
    const [currentFolder, setCurrentFolder] = useState('');
    const [date, setDate] = useState('');
    const [warrantyDate, setWarrantyDate] = useState('');  // New state for warranty date
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [vendorName, setVendorName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productPurchased, setProductPurchased] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const { username } = useParams();
    // State to hold files by year and folder
    const [filesByYearAndFolder, setFilesByYearAndFolder] = useState({})
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
        const fetchFolderNames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_item_names/');
                const folderNames = response.data; // Adjust based on how your backend sends data
                setFolders(folderNames);
                setCurrentFolder('');
            } catch (error) {
                console.error('Error fetching folder names:', error);
            }
        };

        if (selectedYear !== '') {
            fetchFolderNames();  // Call the function to fetch folder names
        }
    }, [selectedYear]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);  // For storing the current file data
    const [updatedFileData, setUpdatedFileData] = useState({}); // Store form data for update

    const handleUpdateClick = (pdf_id, file) => {
        setIsEditing(true);   // Enable edit mode
        setCurrentFile(file); // Set current file data
        setUpdatedFileData({
            vendorName: file.vendorName,
            productPurchased: file.productPurchased,
            totalAmount: file.totalAmount,
            quantity: file.quantity,
            date: file.date,
            warrantyDate: file.warrantyDate,
        });
        console.log(pdf_id);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/update_file/`, {
                ...updatedFileData,
                pdf_id: currentFile.pdf_id,  // Add pdf_id to the request body
            });
            if (response.status === 200) {
                setIsEditing(false); // Close the form after successful update
                handleFolderClick(currentFolder);
            }
        } catch (error) {
            console.error("Error updating file:", error);
            alert("Failed to update file");
        }
    };

    const handleFolderClick = async (folder) => {
        setIsNewButtonDisabled(false); // Assuming this enables the upload button
        setCurrentFolder(folder); // Set the clicked folder as current
        try {
            const response = await axios.post('http://localhost:8000/get_bills/', {
                selectedYear,
                username,
                folder,
            });

            if (response.status === 200) {
                const bills = response.data;
                // Update state with files fetched for the selected folder
                setFilesByYearAndFolder((prev) => ({
                    ...prev,
                    [`${selectedYear}-${folder}`]: bills,  // Store fetched bills under the year-folder key
                }));

            } else {
                alert('Error fetching bills');
            }
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
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


    const handleFileSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a new file object with all the form fields
        const newFile = {
            vendorName,
            totalAmount,
            quantity,
            productPurchased,
            pdfFile,
            date, // Include date in file object
            warrantyDate // Include warranty date in file object
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

        // Prepare FormData object for sending the file and other form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('vendorName', vendorName);
        formData.append('totalAmount', totalAmount);
        formData.append('quantity', quantity);
        formData.append('productPurchased', productPurchased);
        formData.append('pdfFile', pdfFile); // Append the file directly
        formData.append('date', date); // Append date
        formData.append('warrantyDate', warrantyDate); // Append warranty date
        formData.append('selectedYear', selectedYear); // Append selected year
        formData.append('currentFolder', currentFolder); // Append folder name
        console.log(username, vendorName, totalAmount, quantity, productPurchased, date, warrantyDate, selectedYear, currentFolder);
        try {
            // Make the API call to Django
            await axios.post('http://localhost:8000/upload_bill/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

        } catch (error) {
            console.error('Error during file upload:', error);
        }

        handleCloseModal(); // Close the modal after submission

        // Reset form fields to clear out the inputs
        setVendorName('');
        setTotalAmount('');
        setQuantity('');
        setProductPurchased('');
        setPdfFile(null);
        setDate(''); // Reset the date input
        setWarrantyDate(''); // Reset the warranty date input
        handleFolderClick(currentFolder);
    };

    const handleDeleteFile = async (pdf_id, index) => {
        const key = `${selectedYear}-${currentFolder}`;
        const confirmDelete = window.confirm('Are you sure you want to delete this folder?');

        if (!confirmDelete) {
            // If the user clicks "Cancel", do nothing and return
            return;
        }
        try {
            // Make a DELETE request to the Django backend
            const response = await axios.post('http://localhost:8000/delete_bill/', {
                username, // Send the necessary data to identify the file
                selectedYear,
                currentFolder,
                pdf_id, // Assuming you're identifying by the file name or any unique identifier
            });

            if (response.status === 200) {
                // Update the frontend state only after the file is successfully deleted on the backend
                setFilesByYearAndFolder((prev) => {
                    const updatedFiles = { ...prev };
                    if (updatedFiles[key]) {
                        updatedFiles[key] = updatedFiles[key].filter((_, i) => i !== index); // Remove the file from the array
                    }
                    return updatedFiles;
                });
            } else {
                alert('Error deleting file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Error deleting file from server');
        }
    };
    const handleOpenBill = (pdfId) => {
        const pdfUrl = `http://localhost:8000/get_bill_pdf/${pdfId}/`;
        window.open(pdfUrl, '_blank');
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
                                        style={{ width: '200px', position: 'relative', padding: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                                        className="text-center clickable-card"
                                        onDoubleClick={() => handleOpenBill(file.pdf_id)}
                                    >
                                        <Card.Body>
                                            {/* PDF Icon */}
                                            <FontAwesomeIcon icon={faFilePdf} size="3x" className="mb-3" />

                                            {/* Vendor Name and Product */}
                                            <Card.Title className="file-title" style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                                                {file.vendorName}
                                            </Card.Title>
                                            <Card.Subtitle className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>
                                                {file.productPurchased}
                                            </Card.Subtitle>

                                            {/* File details */}
                                            <Card.Text style={{ textAlign: 'left', fontSize: '0.75rem', lineHeight: '1.5' }}>
                                                <strong>Amount:</strong> {file.totalAmount} <br />
                                                <strong>Quantity:</strong> {file.quantity} <br />
                                                <strong>Date:</strong> {file.date} <br />
                                                <strong>Warranty:</strong> {file.warrantyDate}
                                            </Card.Text>
                                            {/* Update Button */}
                                            <Button color="success" size="sm" onClick={() => handleUpdateClick(file.pdf_id, file)} style={{ marginTop: '10px' }}>
                                                <FontAwesomeIcon icon={faEdit} /> Update
                                            </Button>
                                            {/* Delete Button */}
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteFile(file.pdf_id, index)} style={{ marginTop: '10px' }}>
                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}
            {/* Modal for editing file details */}
            <Modal show={isEditing} onHide={() => setIsEditing(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit File Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="text"
                                value={updatedFileData.vendorName}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, vendorName: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="number"
                                value={updatedFileData.totalAmount}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, totalAmount: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="number"
                                value={updatedFileData.quantity}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, quantity: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Product Purchased</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="text"
                                value={updatedFileData.productPurchased}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, productPurchased: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="date"
                                value={updatedFileData.date}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, date: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Warranty Date</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="date"
                                value={updatedFileData.warrantyDate}
                                onChange={(e) => setUpdatedFileData({ ...updatedFileData, warrantyDate: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '20px',marginTop:'16px' }}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* Modal for file upload */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload New Bill Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFileSubmit}>
                        <Form.Group>
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="text"
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="number"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Product Purchased</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="text"
                                value={productPurchased}
                                onChange={(e) => setProductPurchased(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Upload PDF</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPdfFile(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Bill Date</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Warranty Date</Form.Label>
                            <Form.Control
                                className="w-100 border border-secondary rounded-end"
                                type="date"
                                value={warrantyDate}
                                onChange={(e) => setWarrantyDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Upload
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}