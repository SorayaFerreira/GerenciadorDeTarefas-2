import React from 'react'; // Importa a biblioteca React
import { useState } from 'react'; // Importa o hook useState do React
import { TextField, Button, Input, InputAdornment } from '@mui/material'; // Importa componentes do Material-UI
import PersonIcon from '@mui/icons-material/Person'; // Importa o ícone Person do Material-UI
import HomeIcon from '@mui/icons-material/Home'; // Importa o ícone Home do Material-UI
import BookIcon from '@mui/icons-material/Book'; // Importa o ícone Book do Material-UI
import NotificationsIcon from '@mui/icons-material/Notifications'; // Importa o ícone Notifications do Material-UI
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importa o ícone ExitToApp do Material-UI
import './PainelGeral.css'; // Importa o arquivo CSS para estilização
import { useNavigate} from 'react-router-dom'; // Importa a função navigate do pacote @reach/router
import SearchIcon from '@mui/icons-material/Search'; // Importa o ícone Search do Material-UI
import AddIcon from '@mui/icons-material/Add'; // Importa o ícone Add do Material-UI

// Define o componente funcional PainelGeral
const PainelGeral = () => {
    const navigate = useNavigate(''); // Define a variável navigation que armazena o estado da navegação
    const [searchQuery, setSearchQuery] = useState(''); // Estado para o campo de busca

      
    // Função para redirecionar ao clicar no botão
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Função para lidar com a mudança no campo de busca
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Retorna o JSX que define a estrutura do componente
    return(
        <div>
            <div>
                <TextField
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar"
                    fullWidth
                sx={{marginLeft: '300px', width: '18%', position: 'absolute', top: '64px', left: '10px', height: '40px', borderRadius: '10px', backgroundColor: '#ffffff'}}
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                />
                <Button sx={{width:'18%',height:'50px',marginLeft:'980px', top:'64px', position:'absolute', borderRadius:'10px', backgroundColor:'#6D82F7', color:'#fff'}}
                endIcon={<AddIcon/>}>
                    <span>Cadastrar nova tarefa</span>
                </Button>
            </div>
            {/* Menu lateral */}
            <nav className='menu_lateral'>
               
                <div className="profile-icon">
                    <PersonIcon />
                </div>
                {/* Lista de itens do menu */}
                <ul style={{listStyleType:'none'}}className='iten-menu'> 
                    <li>
                        <Button startIcon={<HomeIcon />} sx={{color: 'black'}} onClick={() => handleNavigation('/painelGeral')}>
                            <span>Painel Geral</span>
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={<BookIcon />}sx={{color: 'black'}} onClick={() => handleNavigation('')}>
                            <span>Histórico</span>
                        </Button>
                    </li>
                    <li>
                        <Button startIcon={<NotificationsIcon />}sx={{color: 'black'}} onClick={() => handleNavigation('')}>
                            <span>Notificações</span>
                        </Button>
                    </li>
                </ul>
                {/* Footer com botão de logout */}
                <footer className="menu-footer">
                    <Button startIcon={<ExitToAppIcon />}sx={{color: 'black'}}onClick={() => handleNavigation('/')}>
                        <span>Logout</span>
                    </Button>
                </footer>
            </nav>
            
        </div>
    )
};

// Exporta o componente PainelGeral como padrão
export default PainelGeral;