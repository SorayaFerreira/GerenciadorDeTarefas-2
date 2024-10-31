import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import './imput.css';
import Herder from '../Herder';
import PersonIcon from '@mui/icons-material/Person';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { username, password });
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
          <label htmlFor='username' className='input-label'>Senha</label>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              style: { backgroundColor:'#ffffff', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '5px', height:'52px'}
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor:'6D82F7', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '40px', height:'53px'}}>
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;