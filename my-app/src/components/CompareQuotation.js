import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import TableComponent from './TableComponent';

export default function CompareQuotation() {
  const [selectedYear, setSelectedYear] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const { username } = useParams();
  const [dynamicHeaders, setDynamicHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showrow, setShowrow] = useState(true);


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

  const handleFolderDoubleClick = async (folderName) => {
    setShowrow(false);
    setCurrentFolder(folderName);
    setIsDropdownDisabled(true);
    setShowTable(false); // Reset table visibility before data is fetched

    try {
      const response = await axios.post('http://localhost:8000/fetch_compare_data/', {
        selectedYear,
        username,
        folderName,
      });

      const data = response.data;
      if (response.status === 404) {
        alert('No data available for this folder.');
        return; // Exit the function if no data is available
      }
      processTableData(data);
      setShowTable(true); // Display the table after processing data

    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('No pdf available for this folder.');
      } else {
        console.error('Error fetching folder data:', error);
      }
    }
  };

  const processTableData = (data) => {
    const { pdfs, items } = data;
    if (pdfs.length === 0 || items.length === 0) return;
    // Find the index of the PDF with the maximum number of items
    const maxItemsIndex = items.reduce((maxIndex, currentItemSet, currentIndex) => {
      return currentItemSet.length > items[maxIndex].length ? currentIndex : maxIndex;
    }, 0);
    // Extract the headers: file_name, vendor_name, and the maximum number of items
    const dynamicHeaders = ['file_name', 'vendor_name'];

    // Add item_name, quantity, and price for the PDF with the maximum items
    const maxItems = items[maxItemsIndex];
    maxItems.forEach((_, index) => {
      dynamicHeaders.push(`item_name ${index + 1}`, `quantity ${index + 1}`, `price ${index + 1}`);
    });

    setDynamicHeaders(dynamicHeaders);

    // Prepare table rows
    const rows = pdfs.map((pdf, index) => {
      const { file_name, vendor_name } = pdf;
      const pdfItems = items[index]; // Items for the current PDF

      // Add file_name and vendor_name to the row
      const rowData = [
        { item: file_name, className: "" },
        { item: vendor_name, className: "" },
      ];

      // Add items (item_name, quantity, price) to the row
      pdfItems.forEach(item => {
        rowData.push({ item: item.item_name, className: "" });
        rowData.push({ item: item.quantity, className: "" });
        rowData.push({ item: item.price, className: "" });
      });

      // Fill the remaining columns with empty cells if the number of items is less than the max
      const remainingItems = maxItems.length - pdfItems.length;
      for (let i = 0; i < remainingItems; i++) {
        rowData.push({ item: '', className: '' });
        rowData.push({ item: '', className: '' });
        rowData.push({ item: '', className: '' });
      }

      return rowData;
    });

    setTableRows(rows);
  };


  const handleHomeClick = () => {
    setCurrentFolder(null);
    setSelectedYear('');
    setFolders([]);
    setIsDropdownDisabled(false);
    setShowTable(false);
    setShowrow(true);
  };

  const handleYearClick = async () => {
    if (selectedYear) {
      await fetchFolders();
      setCurrentFolder(null);
      setIsDropdownDisabled(false);
      setShowTable(false);
      setShowrow(true);
    }
  };

  return (
    <div className="folder-creator">
      <div className='d-flex flex-row justify-content-between px-3 mt-2'>
        <br />
        <select
          className="w-25 bg-primary text-white h5 border px-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={isDropdownDisabled}
          style={{ display: isDropdownDisabled ? 'none' : 'block' }}
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
      {showrow && (
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <br />
      {showTable && (
        <TableComponent
          caption="Compare Requirements"
          thData={[
            ...dynamicHeaders.flatMap(header => [
              { text: header, className: "" }
            ])
          ]}
          tbData={tableRows}
        />
      )}

    </div>
  );
}