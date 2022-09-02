import React from 'react'
import { Container } from 'react-bootstrap'
import AddItems from './AddItems'
import { useLocation } from 'react-router-dom'

const EditCart = () => {
    const location = useLocation();
    const prod = {}
  prod['type'] = 'editcart'
  prod['pid'] = location.state.pid
  prod['id'] = location.state.id
  console.log(prod)
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
      <h2>Edit Cart</h2>
        <AddItems product={prod}/>
      </Container>
      </>
  )
}

export default EditCart