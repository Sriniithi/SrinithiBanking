import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore'; // Firestore methods
import { db } from './firebase'; // Firestore instance
import './AccountPage.css';

const AccountPage = () => {
    // Sample transaction history (to be fetched from Firestore later)
    const transactionHistory = [
        { date: '2024-10-01', description: 'Sent to A/C XXXXXXX123', amount: '-₹5,000' },
        { date: '2024-10-03', description: 'Received from A/C XXXXXXX456', amount: '+₹15,000' },
        { date: '2024-10-05', description: 'Sent to A/C XXXXXXX789', amount: '-₹3,000' },
    ];

    // Account number and Firestore doc reference
    const accountNumber = '1234567890'; // Replace with actual account number
    const accountDocRef = doc(db, 'Accounts', accountNumber);

    // Form state
    const [fromAccount, setFromAccount] = useState(accountNumber);
    const [toAccount, setToAccount] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [amount, setAmount] = useState('');
    const [availableBalance, setAvailableBalance] = useState(0); // State to hold balance

    // State to manage form submission
    const [isFormValid, setIsFormValid] = useState(false);

    // Fetch balance when the component mounts
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const docSnap = await getDoc(accountDocRef);
                if (docSnap.exists()) {
                    setAvailableBalance(docSnap.data().balance);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        fetchBalance();
    }, []);

    // Enable button only if all fields are filled
    useEffect(() => {
        validateForm(); // Ensure form is validated each time fields change
    }, [toAccount, ifscCode, amount]);

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
    };

    // Handle form submission and balance update
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert amount to a number
        const transferAmount = parseFloat(amount);

        // Ensure transfer amount is valid
        if (transferAmount <= 0 || transferAmount > availableBalance) {
            alert("Invalid amount or insufficient balance");
            return;
        }

        try {
            // Add transaction to Firestore
            await addDoc(collection(db, "Transactions"), {
                fromAccount,
                toAccount,
                ifscCode,
                amount: transferAmount,
                timestamp: new Date().toISOString()
            });

            // Update the balance in Firestore
            const newBalance = availableBalance - transferAmount;
            await updateDoc(accountDocRef, { balance: newBalance });

            // Update the state with new balance
            setAvailableBalance(newBalance);

            alert("Transaction successful!");

            // Clear form after submission
            setToAccount('');
            setIfscCode('');
            setAmount('');
            setIsFormValid(false); // Disable the form until new input is provided
        } catch (error) {
            console.error("Error during transaction:", error);
            alert("Transaction failed");
        }
    };

    return (
        <div className="account-page-container">
            <h1>Details</h1>

            {/* Available Balance Section */}
            <div className="balance-section">
                <h2>Available Balance</h2>
                <p>₹{availableBalance}</p>
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
                            readOnly // Account number is read-only
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
