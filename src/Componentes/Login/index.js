import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './imput.css';
import Herder from '../Herder';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json();
      if(response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro de autenticação');
    }
  };

  return (
    <div>
      <div>
        <div className='text'>Gerenciador de Tarefas</div>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
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