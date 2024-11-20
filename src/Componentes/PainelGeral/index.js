import React from 'react'; // Importa a biblioteca React
import { useState } from 'react'; // Importa o hook useState do React
import { TextField, Button, Input, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'; // Importa componentes do Material-UI
import PersonIcon from '@mui/icons-material/Person'; // Importa o ícone Person do Material-UI
import HomeIcon from '@mui/icons-material/Home'; // Importa o ícone Home do Material-UI
import BookIcon from '@mui/icons-material/Book'; // Importa o ícone Book do Material-UI
import NotificationsIcon from '@mui/icons-material/Notifications'; // Importa o ícone Notifications do Material-UI
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importa o ícone ExitToApp do Material-UI
import './PainelGeral.css'; // Importa o arquivo CSS para estilização
import { useNavigate} from 'react-router-dom'; // Importa a função navigate do pacote @reach/router
import SearchIcon from '@mui/icons-material/Search'; // Importa o ícone Search do Material-UI
import AddIcon from '@mui/icons-material/Add'; // Importa o ícone Add do Material-UI
import FilterListIcon from '@mui/icons-material/FilterList'; // Importa o ícone FilterList do Material-UI
import IconButton from '@mui/material/IconButton'; // Importa o componente IconButton do Material-UI
import { Select, MenuItem, FormControl, InputLabel, Box} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import 'resize-observer-polyfill'; // Importa o pacote resize-observer-polyfill


// Define o componente funcional PainelGeral
const PainelGeral = () => {
    const navigate = useNavigate(''); // Define a variável navigation que armazena o estado da navegação
    const [searchQuery, setSearchQuery] = useState(''); // Estado para o campo de busca

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const [priority, setPriority] = useState('');

    const handlePriorityChange = (event) => {
    setPriority(event.target.value);
    };
      
    // Função para redirecionar ao clicar no botão
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Função para lidar com a mudança no campo de busca
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (typeof window !== 'undefined') {
        const resizeObserverErrDiv = document.createElement('div');
        const resizeObserverErrMsg = 'ResizeObserver loop limit exceeded';
    
        window.addEventListener('error', (event) => {
            if (event.message === resizeObserverErrMsg) {
                event.stopImmediatePropagation();
            }
        });
    
        resizeObserverErrDiv.id = 'resizeObserverErrDiv';
        resizeObserverErrDiv.style.display = 'none';
        document.body.appendChild(resizeObserverErrDiv);
    }

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
                <IconButton
                sx={{position:'absolute', top:'70px', left:'calc(10px + 40% + 10px)', height:'40px', borderRadius:'10px', backgroundColor:'#ffffff'}}
                >
                    <FilterListIcon />
                </IconButton>
                <Button sx={{width:'18%',height:'50px',marginLeft:'980px', top:'64px', position:'absolute', borderRadius:'10px', backgroundColor:'#6D82F7', color:'#fff'}}
                endIcon={<AddIcon/>}
                onClick={handleClickOpen} // Adiciona o evento de clique para abrir o modal
                >
                    <span>Cadastrar nova tarefa</span>
                </Button>
                <Dialog open={open} onClose={handleClose} sx={{'& .MuiPaper-root': {
                border: '2px solid #6D82F7', // Define a borda do modal
                borderRadius: '20px', // Define bordas arredondadas
                }}}>
                <DialogTitle sx={{backgroundColor:'#6D82F7', color:'#fff', height:'16px', paddingTop:'10px', display:'flex', alignItems:'center'}}>
                    <AssignmentIcon sx={{ marginRight: '8px' }} />
                    Nova Tarefa
                    <CalendarTodayIcon sx={{ marginLeft: 'auto' }} />
                </DialogTitle>
                <DialogContent  sx={{ minHeight: '300px', top:'20px'}}>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="outlined"
                    />
                    <TextField
                    margin="dense"
                    id="description"
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    maxRows={4}
                    sx={{}}
                    />
                    <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel id="priority-label">Prioridade</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        label="Prioridade"
                    >
                        <MenuItem value="alta">Alta</MenuItem>
                        <MenuItem value="media">Média</MenuItem>
                        <MenuItem value="baixa">Baixa</MenuItem>
                    </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleClose}
                    sx={{
                        backgroundColor: '#6D82F7',
                        color: '#fff',
                        position: 'relative',
                        marginRight: '12px',
                        width:'94%',
                        height:'64px',
                        borderRadius:'10px'
                    }}
                    >Confirmar
                    
                    </Button>
                </DialogActions>
                </Dialog>
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