import React from 'react'
import { Navbar} from 'react-bootstrap'
const Navbarhead = () => {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">        
          <Navbar.Brand href="#home">User</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}       
      </Navbar>
  );
}

export default Navbarhead