import './App.css';
import Navbarhead from './components/Navbarhead';
import ProductList from './components/ProductList';
import { Container, Row } from 'react-bootstrap';
import product from './data/product.json'
function App() {
  
  
  return (
    
    <>
      <Navbarhead />
      <br/> 
      <br/> 
      <br/>      
      <Container>
      <h2>Product List</h2>
      <br/>
      <Row>
        <ProductList product={product}/>
      </Row>
        
      </Container>
    </>
  );
}

export default App;
