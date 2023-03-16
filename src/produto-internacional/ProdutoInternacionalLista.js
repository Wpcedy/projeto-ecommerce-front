import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../img/store.png';

function ProdutoLista(props) {
  const navigate = useNavigate();
  const [produtosInternacionais, setProdutosInternacionais] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
    }).then((response) => {
      setProdutosInternacionais(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setProdutosInternacionais([]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    setFiltro(formDataObj);
    buscar();
  };

  const buscar = () => {
    axios({
      method: 'get',
      url: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
      params: {
        name: filtro.name,
        description: filtro.description,
        price: filtro.price,
      },
    }).then((response) => {
      setProdutosInternacionais(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setProdutosInternacionais([]);
    });
  }

  const adicionarCarrinho = (produto) => {
    props.setCarrinho([...props.carrinho, produto]);
  };

  return (
    <div className="ProdutoLista" style={{
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
      <Form noValidate onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="TextLeft">Filtros</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.name">
                  <InputGroup className='TextLeft'>
                    <label>
                      Nome
                      <Form.Control type="text" name="name" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.description">
                  <InputGroup className='TextLeft'>
                    <label>
                      Descrição
                      <Form.Control type="text" name="description" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.price">
                  <InputGroup className='TextLeft'>
                    <label>
                      Preço
                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" name="price"/>
                        <InputGroup.Text>,00</InputGroup.Text>
                      </InputGroup>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className='TextRight'>
                <Button variant="info" id="buscar" type="submit" disabled={submitted}>Filtrar</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Form>
      <br></br>
      <Card>
        <Card.Header className="TextLeft">Produtos Internacionais - Lista</Card.Header>
        <Card.Body>
          {produtosInternacionais.map(
            (produtoInternacional, i) => (
              <Card className="mb-4">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                    <img src={produtoInternacional.gallery[0]} alt="store" height={200} />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <b>Nome:</b> {produtoInternacional.name}<br/>
                          <b>Descrição:</b> {produtoInternacional.description}<br/>
                          <b>Preço:</b> {produtoInternacional.price}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Material:</b> {produtoInternacional.details.material}<br/>
                          <b>Adjetivo:</b> {produtoInternacional.details.adjective}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="TextRight">
                  <Button id="produto-nacional" onClick={() => { adicionarCarrinho(produtoInternacional) }}>Adicionar no carrinho</Button>
                </Card.Footer>
              </Card>
            )
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
      <Toaster />
    </div>
  );
};

export default ProdutoLista;