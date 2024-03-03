import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/PrincipalDashboard.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function PrincipalDashboard({
  isOffcanvasOpen,
  toggleOffcanvas,
  closeOffcanvas,
}) {
  const AppStyle = {
    position: "relative",
    top: "-100px",
    left: isOffcanvasOpen ? "0px" : "0%",
    width: isOffcanvasOpen ? "calc(100% - 260px)" : "100%",
    transition: "all 0.5s ease",
    zIndex: 1000,
  };

  // const navbarStyle = {
  //   left: isOffcanvasOpen ? "260px" : "0%",
  //   right: "0px",
  //   width: isOffcanvasOpen ? "calc(100% - 260px)" : "100%",
  //   transition: "all 0.3s ease  ",
  //   zIndex: 1000,
  // };

  const [selectedYear, setSelectedYear] = useState("");
  const [YearDetails, setYearDetails] = useState([]);
  const [pdfRecords, setPdfRecords] = useState([]);
  const [departmentStates, setDepartmentStates] = useState(
    getInitialDepartmentStates()
  );
  const { state } = useLocation();
  console.log(state);

  const handleOptionChange = async (department, option) => {
    // Update the selectedOption and hasPlaceholder state locally
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        selectedOption: option,
        hasPlaceholder: true, // Assuming the placeholder should still be shown after changing status
      },
    }));
  };

  const handleSaveButtonClick = async (department) => {
    try {
      // Send status and comment to the backend
      await axios.post("http://localhost:8000/principal_status/", {
        dept: department,
        year: selectedYear,
        status: departmentStates[department].selectedOption,
        comment: departmentStates[department].placeholderValue, // Send the comment from the state
      });
      // Update the editVisible and hasPlaceholder state locally
      setDepartmentStates((prevStates) => ({
        ...prevStates,
        [department]: {
          ...prevStates[department],
          editVisible: true,
          hasPlaceholder: false,
        },
      }));
    } catch (error) {
      console.error("Error saving status:", error);
      // Handle error
    }
  };

  const handleEditButtonClick = (department) => {
    // Update the editVisible and hasPlaceholder state locally
    setDepartmentStates((prevStates) => ({
      ...prevStates,
      [department]: {
        ...prevStates[department],
        editVisible: false,
        hasPlaceholder: true,
      },
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dropdown/");
      setYearDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get_all_pdf_records/?selectedYear=${selectedYear}`
      );
      console.log("PDF records for the selected year:", response.data);
      setPdfRecords(response.data);
    } catch (error) {
      console.error("Error fetching PDF records:", error);
    }
  };

  const handleDownloadPDF = (pdfId, dept) => {
    axios
      .get(`http://localhost:8000/download_pdf/${pdfId}/`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${dept}_${pdfId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <div className="container p-2 mw-5" style={AppStyle}>
      <Navbar
        title="LabTracker"
        isOffcanvasOpen={isOffcanvasOpen}
        toggleOffcanvas={toggleOffcanvas}
        // style={navbarStyle}
      />
      <div className="app">
        <Sidebar
          isOffcanvasOpen={isOffcanvasOpen}
          // closeOffcanvas={closeOffcanvas}
          toggleOffcanvas={toggleOffcanvas}
        />
      </div>
      <label htmlFor="language">Financial Year :</label>
      <select
        className="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {YearDetails.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="viewDetails" onClick={handleViewDetails}>
        View
      </button>

      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Department</th>
            <th>Download</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(departmentStates).map((department, index) => (
            <tr key={index}>
              <td className="deptname">{department}</td>
              <td className="downloadfile">
                {pdfRecords.some((record) => record.dept === department) && (
                  <i
                    className="fas fa-download fa-2xl"
                    onClick={() =>
                      handleDownloadPDF(
                        pdfRecords.find((record) => record.dept === department)
                          ?.pdf_id,
                        department
                      )
                    }
                  ></i>
                )}
              </td>
              <td className="status">
                <label>
                  <input
                    className="Dashprincipalinp"
                    type="radio"
                    value="Accept"
                    checked={
                      departmentStates[department]?.selectedOption === "Accept"
                    }
                    onChange={() => handleOptionChange(department, "Accept")}
                  />
                  Accept
                </label>

                <label>
                  <input
                    className="Dashprincipalinp"
                    type="radio"
                    value="Reject"
                    checked={
                      departmentStates[department]?.selectedOption === "Reject"
                    }
                    onChange={() => handleOptionChange(department, "Reject")}
                  />
                  Reject
                </label>

                {departmentStates[department]?.hasPlaceholder && (
                  <div>
                    <textarea
                      value={departmentStates[department]?.placeholderValue}
                      onChange={(e) =>
                        setDepartmentStates((prevStates) => ({
                          ...prevStates,
                          [department]: {
                            ...prevStates[department],
                            placeholderValue: e.target.value,
                          },
                        }))
                      }
                      placeholder="Comments"
                      rows={3}
                      cols={40}
                      style={{ border: "1px solid black" }}
                      disabled={departmentStates[department]?.editVisible}
                    ></textarea>
                    <br />
                    <button
                      className="tablebutton"
                      onClick={() => handleSaveButtonClick(department)}
                      disabled={departmentStates[department].editVisible}
                    >
                      Save
                    </button>
                  </div>
                )}

                {departmentStates[department]?.editVisible && (
                  <div>
                    <button
                      className="tablebutton"
                      onClick={() => handleEditButtonClick(department)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalDashboard;
//arrays in javascript
function getInitialDepartmentStates() {
  const departments = [
    "Computer Science",
    "Information Technology",
    "Artificial Intelligence and Machine Learning",
    "Data Science",
    "Civil",
    "Mechanical",
  ];

  const initialState = {};

  departments.forEach((department) => {
    initialState[department] = {
      selectedOption: "",
      hasPlaceholder: false,
      placeholderValue: "",
      editVisible: false,
    };
  });

  return initialState;
}
