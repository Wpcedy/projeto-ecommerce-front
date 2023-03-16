import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../img/store.png';

function ProdutoNacionalLista(props) {
  const navigate = useNavigate();
  const [produtosNacionais, setProdutosNacionais] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
    }).then((response) => {
      setProdutosNacionais(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setProdutosNacionais([]);
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
      url: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
      params: {
        nome: filtro.nome,
        descricao: filtro.descricao,
        categoria: filtro.categoria,
        preco: filtro.preco,
        material: filtro.material,
        departamento: filtro.departamento,
      },
    }).then((response) => {
      setProdutosNacionais(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setProdutosNacionais([]);
    });
  }

  const adicionarCarrinho = (produto) => {
    props.setCarrinho([...props.carrinho, produto]);
  };

  return (
    <div className="ProdutoNacionalLista" style={{
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
                <Form.Group controlId="form.nome">
                  <InputGroup className='TextLeft'>
                    <label>
                      Nome
                      <Form.Control type="text" name="nome" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.descricao">
                  <InputGroup className='TextLeft'>
                    <label>
                      Descrição
                      <Form.Control type="text" name="descricao" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.categoria">
                  <InputGroup className='TextLeft'>
                    <label>
                      Categoria
                      <Form.Control type="text" name="categoria"/>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="form.preco">
                  <InputGroup className='TextLeft'>
                    <label>
                      Preço
                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" name="preco"/>
                        <InputGroup.Text>,00</InputGroup.Text>
                      </InputGroup>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.material">
                  <InputGroup className='TextLeft'>
                    <label>
                      Material
                      <Form.Control type="text" name="material" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.departamento">
                  <InputGroup className='TextLeft'>
                    <label>
                      Departamento
                      <Form.Control type="text" name="departamento"/>
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
        <Card.Header className="TextLeft">Produtos Nacionais - Lista</Card.Header>
        <Card.Body>
          {produtosNacionais.map(
            (produtoNacional, i) => (
              <Card className="mb-4">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                    <img src={produtoNacional.imagem} alt="store" height={200} />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <b>Nome:</b> {produtoNacional.nome}<br/>
                          <b>Descrição:</b> {produtoNacional.descricao}<br/>
                          <b>Preço:</b> {produtoNacional.preco}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Categoria:</b> {produtoNacional.categoria}<br/>
                          <b>Material:</b> {produtoNacional.material}<br/>
                          <b>Departamento:</b> {produtoNacional.departamento}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="TextRight">
                  <Button id="produto-nacional" onClick={() => { adicionarCarrinho(produtoNacional) }}>Adicionar no carrinho</Button>
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

export default ProdutoNacionalLista;