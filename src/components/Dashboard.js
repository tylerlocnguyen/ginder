import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

//Creates the dashboard and holds the button to go into ginder or update information
export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div className="w-100 text-center mt-3">
            <Link to="/themes" className="btn btn-primary w-100" style={{ fontSize: '1rem' }}>
              Choose Interests
            </Link>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3" style={{ fontSize: '1rem' }}>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" style={{ fontSize: '1rem' }} onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
