import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore config
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import './home-loan.css';

const HomeLoanPage = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [emi, setEmi] = useState({ amount: '', rate: '', tenure: '', emiResult: null });
    const [formData, setFormData] = useState({
        accountNumber: '',
        name: '',
        dob: '',
        mobile: '',
        email: '',
        pan: '',
        fatherName: '',
        gender: 'male',
        passport: '',
        residentialStatus: 'PIO',
        addressLine1: '',
        state: '',
        country: '',
        addressForComm: 'NO',
        occupation: 'Salaried',
        orgType: '',
        empStatus: '',
        workExp: '',
        monthlyIncome: '',
        loanPurpose: '',
        loanAmount: '',
        paymentMode: '',
        signature: '',
        place: '',
        date: '',
        approvalStatus: 'Pending' // Added approval status
    });

    const navigate = useNavigate(); // Initialize navigation hook

    // EMI Calculator logic
    const calculateEMI = (amount, rate, tenure) => {
        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;
        const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return emi.toFixed(2);
    };

    const handleEMISubmit = (e) => {
        e.preventDefault();
        const calculatedEmi = calculateEMI(emi.amount, emi.rate, emi.tenure);
        setEmi({ ...emi, emiResult: calculatedEmi });
    };

    // Handle form field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit the form data to Firestore and redirect
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Adding form data to Firestore "Loans" collection
            await addDoc(collection(db, 'Loans'), formData);
            alert('Application submitted successfully!');

            // Redirect to admin dashboard
            navigate('/components/admin-dashboard');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit application.');
        }
    };

    return (
        <div className="home-loan-page">
            <h1>Loans</h1>
            <img 
                src="/home-loan-image.png" 
                style={{ maxWidth: '100%', height: 'auto' }} 
            />
            <p>
                We understand that a home loan is not just a financial transaction...
            </p>

            {/* EMI Calculator */}
            <h2>EMI Calculator</h2>
            <form onSubmit={handleEMISubmit} className="emi-calculator-form">
                <input
                    type="number"
                    name="amount"
                    placeholder="Loan Amount"
                    value={emi.amount}
                    onChange={(e) => setEmi({ ...emi, amount: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="rate"
                    placeholder="Interest Rate (%)"
                    value={emi.rate}
                    onChange={(e) => setEmi({ ...emi, rate: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="tenure"
                    placeholder="Loan Tenure (Years)"
                    value={emi.tenure}
                    onChange={(e) => setEmi({ ...emi, tenure: e.target.value })}
                    required
                />
                <button type="submit">Calculate EMI</button>
            </form>

            {/* Display EMI result */}
            {emi.emiResult && (
                <div className="emi-result">
                    <h3>Estimated EMI: ₹{emi.emiResult}</h3>
                </div>
            )}

            {/* Apply Online button */}
            <button 
                className="apply-online-btn" 
                onClick={() => setFormVisible(true)}
            >
                Apply Online
            </button>

            {/* Application form */}
            {formVisible && (
                <form onSubmit={handleFormSubmit} className="application-form">
                    <h2>Personal Details</h2>
                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="pan"
                        placeholder="PAN Number"
                        value={formData.pan}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                    />
                    <div>
                        <label>Gender: </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                checked={formData.gender === 'male'} 
                                onChange={handleInputChange} 
                            /> Male
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                checked={formData.gender === 'female'} 
                                onChange={handleInputChange} 
                            /> Female
                        </label>
                    </div>
                    <input
                        type="text"
                        name="passport"
                        placeholder="Passport Number (if any)"
                        value={formData.passport}
                        onChange={handleInputChange}
                    />
                    <div>
                        <label>Residential Status: </label>
                        <select name="residentialStatus" value={formData.residentialStatus} onChange={handleInputChange}>
                            <option value="PIO">Person of Indian Origin (PIO)</option>
                            <option value="Foreign">Foreign Citizen</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="Address Line 1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                    <div>
                        <label>Address for Communication: </label>
                        <label>
                            <input 
                                type="radio" 
                                name="addressForComm" 
                                value="YES" 
                                checked={formData.addressForComm === 'YES'} 
                                onChange={handleInputChange} 
                            /> Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="addressForComm" 
                                value="NO" 
                                checked={formData.addressForComm === 'NO'} 
                                onChange={handleInputChange} 
                            /> No
                        </label>
                    </div>

                    <h2>Occupation</h2>
                    <div>
                        <select name="occupation" value={formData.occupation} onChange={handleInputChange}>
                            <option value="Salaried">Salaried</option>
                            <option value="Business">Business</option>
                            <option value="Student">Student</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                    {formData.occupation === 'Salaried' && (
                        <>
                            <input
                                type="text"
                                name="orgType"
                                placeholder="Organization Type"
                                value={formData.orgType}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="empStatus"
                                placeholder="Employment Status"
                                value={formData.empStatus}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                    <input
                        type="text"
                        name="workExp"
                        placeholder="Work Experience (in years)"
                        value={formData.workExp}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="monthlyIncome"
                        placeholder="Monthly Income"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        required
                    />
                    <h2>Loan Details</h2>
                    <input
                        type="text"
                        name="loanPurpose"
                        placeholder="Purpose of Loan"
                        value={formData.loanPurpose}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="loanAmount"
                        placeholder="Loan Amount"
                        value={formData.loanAmount}
                        onChange={handleInputChange}
                        required
                    />
                    <div>
                        <label>Payment Mode: </label>
                        <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange}>
                            <option value="Cheque">Cheque</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        name="signature"
                        placeholder="Signature"
                        value={formData.signature}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="place"
                        placeholder="Place of Application"
                        value={formData.place}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Submit Application</button>
                </form>
            )}
        </div>
    );
};

export default HomeLoanPage;
