import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import './CadastroUsuario.css';
import Herder from '../Herder';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CadastroUsuario = () => {
  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === confirmUsername && password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username,
          password
        });
        console.log('Usuário cadastrado com sucesso:', response.data);
        navigate('/'); // Redireciona para a página de login
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        setError('Erro ao cadastrar usuário. Tente novamente.');
      }
    } else {
      setError('Os campos de confirmação devem ser iguais aos campos originais.');
    }
  };

  return (
    <div>
      <Herder />
      <div className="login-container">
        <form className='bloco_login' onSubmit={handleSubmit}>
          <div className='text'>Novo Usuário</div>
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
          <label htmlFor='confirmUsername' className='input-label'>Confirmar Email</label>
          <TextField 
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
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
          <label htmlFor='confirmPassword' className='input-label'>Confirmar Senha</label>
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              style: { backgroundColor:'#ffffff', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '5px', height:'52px'}
            }}
          />
          {error && <div style={{ color: 'red', marginLeft: '45px', marginTop: '5px' }}>{error}</div>}
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor:'6D82F7', borderRadius: '10px', width: '80%', marginLeft: '45px', marginTop: '40px', height:'53px'}}>
            Cadastre-se
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;