// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext'; 
import Login from './components/Login';  
import Register from './components/Register';
import AdminDashboard from './components/admin-dashboard'; 
import Loans from './components/Loans';
import HomePage from './components/HomePage';
import AccountDetails from './components/AccountDetails';
import HomeLoanPage from './components/home-loan';
import BankingPayments from './components/BankingPayments';
import AccountPage from './components/AccountPage';


const App = () => {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/components/HomePage" element={<HomePage />} /> 
          <Route path="/BankingPayments" element={<BankingPayments />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:email" element={<AccountDetails />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/home-loan" element={<HomeLoanPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/components/admin-dashboard" element={<AdminDashboard />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
