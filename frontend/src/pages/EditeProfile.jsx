import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditProfile() {
  const [userData, setUserData] = useState({
    Name: '',
    LastName: '',
    Email: '',
    State: '',
    City: '',
    Country: '',
    Address: '',
    Zip: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userData', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/update', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        {/* File upload field */}
        {/* <div className="row mb-3">
          <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Upload Image</label>
          <div className="col-md-8 col-lg-9">
            <div className="pt-2">
              <input type="file" onChange={handleFileChange} name="updateImage" className="form-control" id="formFile"></input>
            </div>
          </div>
        </div> */}

        {/* Full Name field */}
        <div className="row mb-3">
          <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
          <div className="col-md-8 col-lg-9">
            <input name="Name" type="text" onChange={handleInput} value={userData.Name} className="form-control" id="fullName" />
          </div>
        </div>

        {/* Last Name field */}
        <div className="row mb-3">
          <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Last Name</label>
          <div className="col-md-8 col-lg-9">
            <input name="LastName" type="text" onChange={handleInput} value={userData.LastName} className="form-control" id="company" />
          </div>
        </div>

        {/* State field */}
        <div className="row mb-3">
          <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">State</label>
          <div className="col-md-8 col-lg-9">
            <input name="State" type="text" onChange={handleInput} value={userData.State} className="form-control" id="Country" />
          </div>
        </div>

        {/* Address field */}
        <div className="row mb-3">
          <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">Address</label>
          <div className="col-md-8 col-lg-9">
            <textarea name="Address" className="form-control" onChange={handleInput} value={userData.Address} id="about" style={{ height: '100px' }}></textarea>
          </div>
        </div>

        {/* Zip field */}
        <div className="row mb-3">
          <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Zip</label>
          <div className="col-md-8 col-lg-9">
            <input name="Zip" type="text" onChange={handleInput} value={userData.Zip} className="form-control" id="Phone" />
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Update data</button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
