import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../components/firebase'; // Ensure firebase is correctly configured
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
import {
    Container, TextField, Button, Typography, Grid, InputLabel, MenuItem, FormControl, Select, Box
} from '@mui/material';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [panFile, setPanFile] = useState(null);
    const [aadhaarFile, setAadhaarFile] = useState(null);
    const navigate = useNavigate();

    const handlePanChange = (e) => setPanFile(e.target.files[0]);
    const handleAadhaarChange = (e) => setAadhaarFile(e.target.files[0]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const customerRef = collection(db, 'Customer');
            const docRef = await addDoc(customerRef, {
                firstName,
                lastName,
                email,
                password,
                address,
                phoneNumber,
                country,
                panFile: panFile.name,
                aadhaarFile: aadhaarFile.name,
                createdAt: serverTimestamp(),
            });
            alert('Registration successful!');
            navigate('/components/admin-dashboard', {
                state: {
                    customer: {
                        id: docRef.id,
                        firstName,
                        lastName,
                        email,
                        address,
                        phoneNumber,
                        country,
                    },
                },
            });
        } catch (error) {
            console.error('Error registering customer:', error);
            alert('Registration failed, please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label">
                                Upload PAN
                                <input type="file" hidden onChange={handlePanChange} required />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label">
                                Upload Aadhaar
                                <input type="file" hidden onChange={handleAadhaarChange} required />
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
