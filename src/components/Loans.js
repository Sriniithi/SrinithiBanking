import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loans.css'; // Ensure your CSS file is linked properly

const Loans = () => {
    const navigate = useNavigate();

    return (
        <div className="loans-container">
            {/* Header Section with Image */}
            <header className="loans-header">
                <img src="Loans.jpg" alt="Loans Header" className="header-image" />
            </header>

            {/* Buttons for Different Loan Types */}
            <div className="loans-buttons-container">
                <button className="loans-button" onClick={() => navigate('/home-loan')}>Home Loan</button>
                <button className="loans-button" onClick={() => navigate('/gold-loan')}>Gold Loan</button>
                <button className="loans-button" onClick={() => navigate('/vehicle-loan')}>Vehicle Loan</button>
                <button className="loans-button" onClick={() => navigate('/education-loan')}>Education Loan</button>
                <button className="loans-button" onClick={() => navigate('/personal-loan')}>Personal Loan</button>
            </div>
        </div>
    );
};

export default Loans;
