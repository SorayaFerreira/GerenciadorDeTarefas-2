import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Componentes/Login';
import PainelGeral from './Componentes/PainelGeral';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/painelGeral" element={<PainelGeral />}/>
        <Route path="*" element={<div>Página não encontrada</div>}/>
      </Routes>
   </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

export default App;