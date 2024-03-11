import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../config'


const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/selectRoom');
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${url}/users/login`, formData);
            console.log(response.data);
        } catch (error) {
            console.error('Login failed:', error.message);
            alert("הנתונים שהוזנו שגויים")
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            כניסה
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="שם משתמש"
                                name="name"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="סיסמא"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />

                            <Button onClick={handleClick}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                כניסה
                            </Button>
                        
                            <Grid container>
                                <Grid item xs>
                                    <div href="#" variant="body2">
                                        שכחת סיסמא?
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
