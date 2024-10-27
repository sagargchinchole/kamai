import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'

const ProfilePage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', bio: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorMessage('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        'http://localhost:5000/api/profile',
        { name: userData.name, email: userData.email, bio: userData.bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Failed to update profile.');
      console.error('Error updating profile:', error);
    }
  };

  return (
      <div className="profile-container">
          <div className='profile-info'>
              <h2>User Profile</h2>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <form onSubmit={handleUpdate}>
                  <div>
                      <label>Name:</label>
                      <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
                  </div>
                  <div>
                      <label>Email:</label>
                      <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                  </div>
                  <div>
                      <label>Bio:</label>
                      <textarea name="bio" value={userData.bio} onChange={handleInputChange} />
                  </div>
                  <button type="submit">Update Profile</button>
              </form>
          </div>
      </div>
  );
};

export default ProfilePage;
