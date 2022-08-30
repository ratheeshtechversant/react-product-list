import React from 'react'
import { Container } from 'react-bootstrap'
import AddItems from './AddItems'
const AddToCart = ({product}) => {
  const prod = {}
    prod['type'] = 'addcart'
    prod['pid'] = product
    console.log(product)
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
      <h2>Add to Cart</h2>

          <AddItems product={prod}/>
      </Container>
      </>
  )
}

export default AddToCart