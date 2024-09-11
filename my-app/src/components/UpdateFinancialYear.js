import React, { useState, useEffect } from 'react';
import '../assets/css/UpdateFinancialYear.css';   // name changed og name was UpdationTable.css
import axios from 'axios';
import TableComponent from './TableComponent';
import ButtonComponent from './ButtonComponent';
import { Modal, Form, Button } from 'react-bootstrap';

function UpdateFinancialYear({ isOffcanvasOpen }) {
  const [financialYears, setFinancialYears] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [yearValue, setYearValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_financialyears/');
      const { years, desc } = response.data;
      const data = years.map((year, index) => ({ year, desc: desc[index] }));
      setFinancialYears(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDownloadClick = () => {
    setShowModal(true);
    setAddButtonClicked(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post_year_desc/', { F_year: yearValue, Desc: descValue });
      console.log('Data sent successfully:', response.data);
      alert('Data sent successfully!');
      fetchData();
      setAddButtonClicked(false)
      setShowModal(false);
      setYearValue('');
      setDescValue('');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to send data');
    }
  };
  // Function to update the value of yearValue and generate the description dynamically
  const handleYearChange = (e) => {
    const newYearValue = e.target.value;
    setYearValue(newYearValue);
    setDescValue(generateDescription(newYearValue));
  };
  const handleCloseClick =(e)=>{
    setShowModal(false);
    setAddButtonClicked(false);
  }

  // Function to generate the description dynamically based on the year value
  const generateDescription = (yearValue) => {
    if (yearValue.trim() === '') return '';
    const startYear = parseInt(yearValue) - 1;
    return `${startYear}-${yearValue}`;
  };

  const getTableBodyItemsFromUpdateFinancialYears = () => {
    /**
     * financialyears=[{year: 2015, desc: '2014-2015'},{year: 2016, desc: '2015-2016'},...]
     * 
     * 
     * response=[
     *            [
     *                {item:2015},
     *                {item:2014-2015}
     *              ]               
     *            ]
     */

    let updateFinancialYearBodyRows = []
    Object.keys(financialYears).forEach(index => {
      let updateFinancialYearBodyRow = []
      Object.keys(financialYears[index]).forEach(key => {
        let rowcell = {};
        rowcell['item'] = financialYears[index][key];
        updateFinancialYearBodyRow.push(rowcell)
      })

      updateFinancialYearBodyRows.push(updateFinancialYearBodyRow);
    })

    return updateFinancialYearBodyRows;

  }
  return (
    <div className='w-100 h-100'>
      <br></br>
      <TableComponent
        thData={[{ text: "Financial Year", className: "" }, { text: "Description", className: "" }]}
        tbData={getTableBodyItemsFromUpdateFinancialYears()}
        caption={
          <div className='d-flex flex-row justify-content-between px-3 mt-2'>
            <span className='h2'>Update Financial Year</span>
          </div>
        }
      />
      {!addButtonClicked &&
        <ButtonComponent onClick={handleDownloadClick} text={"Add Financial year"} />}
      <br></br><br></br>
      {/* Modal for adding or updating financial year */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='text-primary font-weight-bold'>Add Financial Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFinancialYear">
              <Form.Label>Financial Year</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="E.g. 2025" 
                value={yearValue} 
                onChange={handleYearChange} 
                className="w-100 border border-secondary rounded-end"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="E.g. 2024-2025" 
                value={descValue} 
                readOnly 
                className="w-100 border border-secondary rounded-end"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateFinancialYear;