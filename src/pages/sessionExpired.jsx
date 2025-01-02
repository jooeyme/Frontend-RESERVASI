import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpired = () => {
    const navigate = useNavigate();

    const handleLoginAgain = () => {
        // Redirect ke halaman login
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Session Expired</h1>
            <p>Your session has expired. Please log in again to continue.</p>
            <button onClick={handleLoginAgain} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Login Again
            </button>
        </div>
    );
};

export default SessionExpired;
