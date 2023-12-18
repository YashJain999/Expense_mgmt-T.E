import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/PasswordReset.css';

function PasswordReset() {
  const [formData, setFormData] = useState({
    email: '',
    Passcode: '',
    new: '',
    confirm: '',
  });
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(false);
  const [passcodeVerificationMessage, setPasscodeVerificationMessage] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/verify-email/', { email: formData.email });
      if (response.status === 200) {
        setIsVerified(true);
        setVerificationMessage("Email verification successful!");
        //alert("Email verification successful!");
      } else {
        setIsVerified(false);
        setVerificationMessage("Email verification failed. Please check the email address.");
        alert("Email verification failed. Please check the email address.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsVerified(false);
        setVerificationMessage("Email verification failed. Please check the email address.");
        alert("Email verification failed. Please check the email address.");
      } else {
        console.error(error);
        setIsVerified(false);
        setVerificationMessage("An error occurred while verifying the email. Please try again later.");
      }
    }
  };
  

  const handlePasscodeVerification = () => {
    // You can implement passcode verification logic here.
    // For simplicity, we assume passcode "123456" is valid.
    if (formData.Passcode === "123456") {
      setIsPasscodeVerified(true);
      setPasscodeVerificationMessage("Passcode verification successful!");
    } else {
      setIsPasscodeVerified(false);
      setPasscodeVerificationMessage("Passcode verification failed. Please check the passcode.");
    }
  };

  
  const handlePasswordUpdate = async () => {
    try {
      if (formData.new === formData.confirm) {
        const response = await axios.post("http://127.0.0.1:8000/update-password/", {
          u_pass: formData.confirm,
          email: formData.email
        });
          if (response.status === 201) {
          setIsPasswordUpdated(true);
          setPasswordUpdateMessage("Password updated successfully!");
          alert("Password update successful")
          navigate(`/`);
        } 
          else {
          alert("Unable to update password. Please try again.");
        }
      } 
      else {
        setIsPasswordUpdated(false);
        setPasswordUpdateMessage("Passwords do not match. Please make sure both passwords match.");
        alert("Passwords do not match. Please make sure both passwords match.")
      }
    } catch (error) {
      console.error("Password update error:", error);
      alert("An error occurred while updating the password. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerification();
    handlePasscodeVerification();
    handlePasswordUpdate();
  };
  
  return (
    <div className="App">
      <div className="password-container">
        <h1>LAB TRACKER</h1>
        <div className="password-form">
          <div className='header'></div>
          <h2>Forget Password Page</h2>
          <form onSubmit={handleSubmit}>  
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="button" onClick={handleVerification}>Verify E-mail</button>
            </div>
            <br></br>
            
            {isVerified && (
              <div>
                <label>Passcode:</label>
                <input
                  type="text"
                  name="Passcode"
                  value={formData.Passcode}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isVerified && (
              <div>
                <button type="button" onClick={handlePasscodeVerification}>Verify Passcode</button>
              </div>
            )}
            <br></br>
            
            {isPasscodeVerified && (
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  name="new"
                  value={formData.new}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isPasscodeVerified && (
              <div>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <br></br>
            <div id="fg">
              <Link to="/">goto login</Link>
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
            {isPasswordUpdated && <p style={{ color: 'green' }}>{passwordUpdateMessage}</p>}
            {!isPasswordUpdated && <p style={{ color: 'red' }}>{passwordUpdateMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
