import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password encryption
import './Login.css'; // Ensure your CSS file is linked properly

const Login = () => {
    const [username, setUsername] = useState(''); // Updated to username
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Hashed password for 'Admin@123' using bcrypt
    const storedPasswordHash = '$2b$12$IWmwes2Q4kpClOUgil68e.B7vJe659Qnpir4rN6Uoy4OmfjkjvFby';

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if the username is 'Srinithi'
        if (username === 'Srinithi') { // Changed email to username
            // Compare the entered password with the stored hashed password
            bcrypt.compare(password, storedPasswordHash, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                } else if (isMatch) {
                    console.log('Login successful');
                    // Navigate to Admin Dashboard
                    navigate('/components/admin-dashboard'); // Update the navigation path
                } else {
                    alert('Incorrect password');
                }
            });
        } else {
            // Redirect to Home Page for other usernames
            navigate('/components/HomePage'); // Redirect to the Home Page for other usernames
        }
    };

    return (
        <div className="login-container">
            {/* Header section with navigation buttons on top right */}
            <header className="login-header">
                <div className="header-right">
                    <button className="header-button" onClick={() => navigate('/home-loan')}>Loans</button> {/* Updated Loans navigation */}
                    <button className="header-button" onClick={() => navigate('/investments')}>Investments/Deposits</button>
                    <button className="header-button" onClick={() => navigate('/information')}>Information/Services</button>
                    <button className="header-button" onClick={() => navigate('/login')}>Login</button>
                    <button className="header-button" onClick={() => navigate('/register')}>Register</button>
                </div>
            </header>

            {/* Background image section */}
            <div className="background-image">
                {/* Add your background image styling in CSS */}
            </div>

            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label> {/* Updated to Username */}
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

                {/* New User / Registration Link */}
                <div className="new-user-container">
                    <p>New User? <span className="register-link" onClick={() => navigate('/register')}>Register here</span></p>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer-container">
                {/* Home Section */}
                <div className="footer-section">
                    <h3>Home</h3>
                    <ul>
                        <li onClick={() => navigate('/interest-rates')}>Interest Rates</li>
                        <li onClick={() => navigate('/download-forms')}>Download Forms</li>
                        <li onClick={() => navigate('/corporate-social-responsibility')}>Corporate Social Responsibility</li>
                        <li onClick={() => navigate('/sustainability-business')}>Sustainability and Business</li>
                        <li onClick={() => navigate('/responsibility-policy')}>Responsibility Policy</li>
                    </ul>
                </div>

                {/* NRI Section */}
                <div className="footer-section">
                    <h3>NRI</h3>
                    <ul>
                        <li onClick={() => navigate('/nri/accounts')}>Accounts</li>
                        <li onClick={() => navigate('/nri/investments')}>Investments</li>
                        <li onClick={() => navigate('/nri/loans')}>Loans</li>
                        <li onClick={() => navigate('/nri/information')}>Information</li>
                        <li onClick={() => navigate('/nri/privacy-notice')}>Privacy Notice and Consent</li>
                        <li onClick={() => navigate('/nri/forms')}>Forms</li>
                    </ul>
                </div>

                {/* Personal Section */}
                <div className="footer-section">
                    <h3>Personal</h3>
                    <ul>
                        <li onClick={() => navigate('/personal/savings-account')}>Savings Account</li>
                        <li onClick={() => navigate('/home-loan')}>Loans</li> {/* Updated Loans navigation */}
                        <li onClick={() => navigate('/personal/investments-deposits')}>Investments & Deposits</li>
                        <li onClick={() => navigate('/personal/cards')}>Cards</li>
                        <li onClick={() => navigate('/personal/digital')}>Digital</li>
                        <li onClick={() => navigate('/personal/information-services')}>Information & Services</li>
                    </ul>
                </div>

                {/* International Banking Section */}
                <div className="footer-section">
                    <h3>International Banking</h3>
                    <ul>
                        <li onClick={() => navigate('/international-banking/banking')}>Banking</li>
                        <li onClick={() => navigate('/international-banking/services')}>Services</li>
                    </ul>
                </div>

                {/* Business Section */}
                <div className="footer-section">
                    <h3>Business</h3>
                    <ul>
                        <li onClick={() => navigate('/business/current-account')}>Current Account</li>
                        <li onClick={() => navigate('/business/information')}>Information</li>
                    </ul>
                </div>

                {/* Wealth Management Section */}
                <div className="footer-section">
                    <h3>Wealth Management</h3>
                    <ul>
                        <li onClick={() => navigate('/wealth-management/products')}>Products</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Login;
