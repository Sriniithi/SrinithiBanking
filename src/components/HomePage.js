import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { useUser } from './UserContext';
import './HomePage.css'; // For styling the page and buttons

const HomePage = ({ userEmail: propUserEmail }) => { // Accept userEmail as a prop
    const navigate = useNavigate(); // Initialize useNavigate
    const { userEmail } = useUser();

    console.log('Prop User Email:', propUserEmail);
    console.log('Context User Email:', userEmail);

    // Function to handle logout
    const handleLogout = () => {
        // Add any logout logic here
        navigate('/login'); // Redirect to Login page
    };

    // Function to navigate to account details
    const handleAccountClick = () => {
        navigate(`/account/${encodeURIComponent(userEmail)}`); // Navigate to account details page
    };

    // Function to navigate to Banking/Payments page
    const handleBankingPaymentsClick = () => {
        navigate('/BankingPayments'); // Change the path to your Banking/Payments page
    };

    // Function to navigate to home loan page
    const handleApplyLoanClick = () => {
        navigate('/home-loan'); // Redirect to home loan page
    };

    return (
        <div className="home-page-container">
            {/* Top navigation bar */}
            <div className="nav-bar">
                {/* Left-side buttons */}
                <div className="left-buttons">
                    <button className="nav-btn" onClick={handleBankingPaymentsClick}>Banking/Payments</button> {/* Added onClick event */}
                    <button className="nav-btn" onClick={handleApplyLoanClick}>Apply for Loan</button> {/* Added onClick event */}
                    <button className="nav-btn">How it works?</button>
                </div>

                {/* Right-side buttons */}
                <div className="right-buttons">
                    <button className="nav-btn" onClick={handleAccountClick}>Account</button>
                    <button className="nav-btn" onClick={handleLogout}>Logout</button> {/* Added onClick event */}
                </div>
            </div>

            {/* Main content of your home page */}
            <div className="home-page-content">
                <h1>Welcome to the Home Page</h1>
                <p>Here you can manage all your banking and payment needs.</p>
            </div>
        </div>
    );
};

export default HomePage;
