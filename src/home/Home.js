import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import store from '../img/store.png';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home" style={{
      paddingTop: '15px',
    }}>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <img src={store} alt="store" height={250} /><br></br>
          Bem vindo(a)
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button id="home" onClick={() => navigate("/")}>Home</Button>{' '}
              <Button id="produtos-nacionais" onClick={() => navigate("/produtos-nacionais")}>Produtos Nacionais</Button>{' '}
              <Button id="produtos-internacionais" onClick={() => navigate("/produtos-internacionais")}>Produtos Internacionais</Button>{' '}
              <Button id="carrinho" onClick={() => navigate("/carrinho")}>Carrinho</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card><br></br>
      <Card>
        <Card.Header className="TextLeft">Home</Card.Header>
        <Card.Body>Projeto ECommerce frontend - processo seletivo</Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default Home;