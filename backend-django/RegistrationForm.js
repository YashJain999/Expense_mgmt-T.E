import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; 

function CreateUser() {
  const [userData, setUserData] = useState({
    u_email: '',
    u_pass: '',
    u_desig: '',
    u_dep: '',
  });

  // const [formData, setFormData] = useState({
  //   u_email: '',
  //   u_pass: '',
  //   u_desig: '',
  //   u_dep: '',
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-user/', {
        u_email: userData.u_email,
        u_pass: userData.u_pass,
        u_desig: userData.u_desig,
        u_dep: userData.u_dep,
      });
      if (response.status === 201) {
        window.alert('User created successfully');
      } 
      if (response.status === 400) {
        window.alert('Email already exists');
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert('Failed to create user');
    }
  };
  
  return (
    <>
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="u_email"
            value={userData.u_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="u_pass"
            value={userData.u_pass}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>Designation:</label>
          <select
            name="u_desig"
            value={userData.u_desig}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <option value="Select Designation"></option>
            <option value="HOD">HOD</option>
            <option value="staff">Staff</option>
            <option value="Principal">Principal</option>
          </select>
        </div>
        <div>
        <label>Deparment:</label>
          <select
            name="u_dep"
            value={userData.u_dep}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <option ></option>
            <option value="IT">IT</option>
            <option value="CS">CS</option>
            <option value="DS">DS</option>
            <option value="AIML">AIML</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MEC">MEC</option>
          </select>
        </div>
        <br></br>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default CreateUser;



// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateUser() {
//   const [userData, setUserData] = useState({
//     u_email: '',
//     u_pass: '',
//     u_desig: '',
//     u_dep: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/create-user/', userData);
//       if (response.status === 201) {
//         window.alert('User created successfully');
//       } 

//       if (response.status === 400) {
//         window.alert('Email already exists');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       window.alert('Failed to create user');
//     }
//   };

//   return (
//     <div>
//       <h2>Create User</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             name="u_email"
//             placeholder="Email"
//             value={userData.u_email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             name="u_pass"
//             placeholder="Password"
//             value={userData.u_pass}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="u_desig"
//             placeholder="Designation"
//             value={userData.u_desig}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="u_dep"
//             placeholder="Department"
//             value={userData.u_dep}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// }

// export default CreateUser;
