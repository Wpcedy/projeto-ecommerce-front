import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import ProdutoNacionalLista from './produto-nacional/ProdutoNacionalLista';
import ProdutoInternacionalLista from './produto-internacional/ProdutoInternacionalLista';
import Carrinho from './carrinho/Carrinho';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <div className="App">
      <Container>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos-nacionais" element={<ProdutoNacionalLista carrinho={carrinho} setCarrinho={setCarrinho} />} />
              <Route path="/produtos-internacionais" element={<ProdutoInternacionalLista carrinho={carrinho} setCarrinho={setCarrinho} />} />
              <Route path="/carrinho" element={<Carrinho carrinho={carrinho} setCarrinho={setCarrinho} />} />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </Router>
      </Container>
    </div>
  );
}

export default App;
