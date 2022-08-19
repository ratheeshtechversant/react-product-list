import React from 'react'
import { Navbar, Nav,Container} from 'react-bootstrap'
import {Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import ProductList from './ProductList';
import Signup from './Signup';

const Navbarhead = () => {
  

  return (<>
    <Navbar fixed="top" bg="dark" variant="dark">        
          <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className='nav-link'>Home</Link>
            
          </Nav> 
          {/* <Form className="d-flex"> */}
            <Link to ="signup" className='btn btn-primary'>Sign-up</Link>&nbsp;
            <Link to ="login" className='btn btn-primary'>Login</Link>
          {/* </Form> */}
        </Navbar.Collapse>
      </Container> 
      </Navbar>


    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
</>
  );
}

export default Navbarhead