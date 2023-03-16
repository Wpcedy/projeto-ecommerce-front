import { Button, Card, Col, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../img/store.png';
import api from '../services/api';

function PedidoLista(props) {
  const navigate = useNavigate();

  const comprar = () => {
    api.post(
      "/pedido/new",
      JSON.stringify({
        produtos: props.carrinho,
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      toast.success('Compra realizada com sucesso!');
      props.setCarrinho([]);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const limparCarrinho = () => {
    toast.success('Carrinho limpo com sucesso!');
    props.setCarrinho([]);
  };

  return (
    <div className="PedidoLista" style={{
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
        <Card.Header className="TextLeft">
          <Row>
            <Col className='TextLeft'>
              Carrinho
            </Col>
            <Col className='TextRight'>
              <Button variant="danger" onClick={() => limparCarrinho()}>Limpar Carrinho</Button>{' '}
              <Button variant="secondary" onClick={() => comprar()}>Comprar</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {props.carrinho.map(
            (produto, i) => (
              <Card className="mb-4">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <img src={produto.imagem ? produto.imagem : produto.gallery[0]} alt="store" height={200} />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <b>Nome:</b> {produto.nome ? produto.nome : produto.name}<br />
                          <b>Descrição:</b> {produto.descricao ? produto.descricao : produto.description}<br />
                          <b>Preço:</b> {produto.preco ? produto.preco : produto.price}<br />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Categoria:</b> {produto.categoria ? produto.categoria : 'N/I'}<br />
                          <b>Material:</b> {produto.material ? produto.material : produto.details.material}<br />
                          <b>Adjetivo:</b> {produto.departamento ? produto.departamento : produto.details.adjective}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            )
          )}
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col className='TextRight'>
              <Button variant="danger" onClick={() => limparCarrinho()}>Limpar Carrinho</Button>{' '}
              <Button variant="secondary" onClick={() => comprar()}>Comprar</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Toaster />
    </div>
  );
};

export default PedidoLista;