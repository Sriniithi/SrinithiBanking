import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import { db } from './firebase'; // Firestore instance
import './AccountPage.css';

const AccountPage = () => {
    // Sample balance and transactions
    const [availableBalance] = useState('₹1,00,000');
    const transactionHistory = [
        { date: '2024-10-01', description: 'Sent to A/C XXXXXXX123', amount: '₹5,000' },
        { date: '2024-10-03', description: 'Received from A/C XXXXXXX456', amount: '₹15,000' },
        { date: '2024-10-05', description: 'Sent to A/C XXXXXXX789', amount: '₹3,000' },
    ];

    // Form state
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [amount, setAmount] = useState('');

    // State to manage form submission
    const [isFormValid, setIsFormValid] = useState(false);

    // Enable button only if all fields are filled
    const validateForm = () => {
        if (fromAccount && toAccount && ifscCode && amount) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    // Handle form field changes
    const handleFieldChange = (setter) => (e) => {
        setter(e.target.value);
        validateForm();
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "Transactions"), {
                fromAccount,
                toAccount,
                ifscCode,
                amount,
                timestamp: new Date().toISOString()
            });
            alert("Transaction added successfully!");
            // Clear form after submission
            setFromAccount('');
            setToAccount('');
            setIfscCode('');
            setAmount('');
            setIsFormValid(false);
        } catch (error) {
            console.error("Error adding transaction: ", error);
            alert("Error occurred while adding transaction");
        }
    };

    return (
        <div className="account-page-container">
            <h1>Details</h1>

            {/* Available Balance Section */}
            <div className="balance-section">
                <h2>Available Balance</h2>
                <p>{availableBalance}</p>
            </div>

            {/* Transaction History Section */}
            <div className="transaction-history-section">
                <h2>Transaction History</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionHistory.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Money Transfer Section */}
            <div className="transfer-section">
                <h2>Transfer Details</h2>
                <form className="transfer-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="fromAccount">From: Account Number</label>
                        <input
                            type="text"
                            id="fromAccount"
                            value={fromAccount}
                            onChange={handleFieldChange(setFromAccount)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="toAccount">To: Account Number</label>
                        <input
                            type="text"
                            id="toAccount"
                            value={toAccount}
                            onChange={handleFieldChange(setToAccount)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="ifscCode">IFSC Code</label>
                        <input
                            type="text"
                            id="ifscCode"
                            value={ifscCode}
                            onChange={handleFieldChange(setIfscCode)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={handleFieldChange(setAmount)}
                        />
                    </div>
                    <button type="submit" disabled={!isFormValid}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountPage;
