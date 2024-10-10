import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './BankingPayments.css'; // Import the CSS file for styling

const BankingPayments = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation when account number is clicked
    const handleAccountClick = () => {
        navigate('/account'); // Change '/account' to the desired route
    };

    return (
        <div className="banking-payments-container">
            <div className="banking-card" onClick={handleAccountClick} style={{ cursor: 'pointer' }}>
                <h2>Account Number</h2>
                <p>Transactions are made using Account Number</p>
            </div>
            <div className="options-container">
                <div className="option-card">
                    <h3>Internet Banking</h3>
                    <p>UPI</p>
                </div>
                <div className="option-card">
                    <h3>Branch visit</h3>
                    <p>Visit the Bank branch and fill up the form with all the payment details</p>
                </div>
                <div className="option-card">
                    <h3>Pockets</h3>
                    <p>With e-Wallet, you can transfer money to bank accounts and mobile numbers</p>
                </div>
            </div>
        </div>
    );
};

export default BankingPayments;
