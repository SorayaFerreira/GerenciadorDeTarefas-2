import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import './imput.css';
import Herder from '../../Herder';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
  } catch (error) {
      alert('Invalid credentials');
  }
  };

  return (
    <div>
      <Herder />
      <div className="login-container">
        <form className='bloco_login' onSubmit={handleLogin}>
          <div className='text'>Gerenciador de Tarefas</div>
          <label htmlFor='username' className='input-label'>Email</label>
          <TextField 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
              style: { backgroundColor:'#ffffff', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '5px', height:'52px'}
            }}
          />
          <label htmlFor='password' className='input-label'>Senha</label>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              style: { backgroundColor:'#ffffff', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '5px', height:'52px'}
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor:'#6D82F7', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '40px', height:'53px'}}>
            Confirmar
          </Button>
          {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;