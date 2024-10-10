import React, { useEffect, useState } from 'react';
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import './admin-dashboard.css';

const AdminDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('customers');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(
                'https://firestore.googleapis.com/v1/projects/bankmanagement-4376d/databases/(default)/documents/Customer'
            );
            const data = await response.json();
            if (data.documents) {
                const customerList = data.documents.map((doc) => {
                    const fields = doc.fields;
                    return {
                        id: doc.name.split('/').pop(),
                        firstName: fields.firstName?.stringValue || '',
                        lastName: fields.lastName?.stringValue || '',
                        email: fields.email?.stringValue || '',
                        address: fields.address?.stringValue || '',
                        phoneNumber: fields.phoneNumber?.stringValue || '',
                        country: fields.country?.stringValue || '',
                        panFile: fields.panFile?.stringValue || '',
                        aadhaarFile: fields.aadhaarFile?.stringValue || '',
                        status: fields.status?.stringValue || '',
                    };
                });
                setCustomers(customerList);
            } else {
                setCustomers([]);
            }
        };

        const fetchLoans = async () => {
            const response = await fetch(
                'https://firestore.googleapis.com/v1/projects/bankmanagement-4376d/databases/(default)/documents/Loans'
            );
            const data = await response.json();
            if (data.documents) {
                const loanList = data.documents.map((doc) => {
                    const fields = doc.fields;
                    return {
                        id: doc.name.split('/').pop(),
                        customerId: fields.customerId?.stringValue || '',
                        loanAmount: fields.loanAmount?.stringValue || '',
                        approvalStatus: fields.approvalStatus?.stringValue || '',
                    };
                });
                setLoans(loanList);
            } else {
                setLoans([]);
            }
        };

        const fetchTransactions = async () => {
            const response = await fetch(
                'https://firestore.googleapis.com/v1/projects/bankmanagement-4376d/databases/(default)/documents/Transactions'
            );
            const data = await response.json();
            if (data.documents) {
                const transactionList = data.documents.map((doc) => {
                    const fields = doc.fields;
                    return {
                        id: doc.name.split('/').pop(),
                        customerId: fields.customerId?.stringValue || '',
                        amount: fields.amount?.stringValue || '',
                        date: fields.date?.stringValue || '',
                        type: fields.type?.stringValue || '',
                    };
                });
                setTransactions(transactionList);
            } else {
                setTransactions([]);
            }
        };

        fetchCustomers();
        fetchLoans();
        fetchTransactions();
        setLoading(false);
    }, []);

    const handleLoanDecision = async (loanId, decision) => {
        await fetch(`https://firestore.googleapis.com/v1/projects/bankmanagement-4376d/databases/(default)/documents/Loans/${loanId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { approvalStatus: { stringValue: decision } } }),
        });
        setLoans(loans.map((loan) => (loan.id === loanId ? { ...loan, approvalStatus: decision } : loan)));
    };

    const handleCustomerDecision = async (customerId, decision) => {
        await fetch(`https://firestore.googleapis.com/v1/projects/bankmanagement-4376d/databases/(default)/documents/Customer/${customerId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { status: { stringValue: decision } } }),
        });
        setCustomers(customers.map((customer) => (customer.id === customerId ? { ...customer, status: decision } : customer)));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                <Box sx={{ mb: 2 }}>
                    <Button onClick={() => setActiveSection('customers')} variant="contained">Customer Details</Button>
                    <Button onClick={() => setActiveSection('loans')} variant="contained" sx={{ mx: 2 }}>Loan Approvals</Button>
                    <Button onClick={() => setActiveSection('transactions')} variant="contained">Transactions</Button>
                </Box>

                {/* Customers Section */}
                {activeSection === 'customers' && (
                    <Box>
                        <Typography variant="h6">Customer Details</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>PAN File</TableCell>
                                    <TableCell>Aadhaar File</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.firstName}</TableCell>
                                        <TableCell>{customer.lastName}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phoneNumber}</TableCell>
                                        <TableCell>{customer.address}</TableCell>
                                        <TableCell>{customer.panFile}</TableCell>
                                        <TableCell>{customer.aadhaarFile}</TableCell>
                                        <TableCell>{customer.status}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleCustomerDecision(customer.id, 'Approve')}>Approve</Button>
                                            <Button onClick={() => handleCustomerDecision(customer.id, 'Hold')}>Hold</Button>
                                            <Button onClick={() => handleCustomerDecision(customer.id, 'Reject')}>Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {/* Loans Section */}
                {activeSection === 'loans' && (
                    <Box>
                        <Typography variant="h6">Loan Approvals</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Customer ID</TableCell>
                                    <TableCell>Loan Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loans.map((loan) => (
                                    <TableRow key={loan.id}>
                                        <TableCell>{loan.id}</TableCell>
                                        <TableCell>{loan.customerId}</TableCell>
                                        <TableCell>{loan.loanAmount}</TableCell>
                                        <TableCell>{loan.approvalStatus}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleLoanDecision(loan.id, 'Approve')}>Approve</Button>
                                            <Button onClick={() => handleLoanDecision(loan.id, 'Hold')}>Hold</Button>
                                            <Button onClick={() => handleLoanDecision(loan.id, 'Reject')}>Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {/* Transactions Section */}
                {activeSection === 'transactions' && (
                    <Box>
                        <Typography variant="h6">Transactions</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Customer ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.id}</TableCell>
                                        <TableCell>{transaction.customerId}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
