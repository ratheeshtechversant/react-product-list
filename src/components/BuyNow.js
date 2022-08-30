import React from 'react'
import { Container } from 'react-bootstrap'
import AddItems from './AddItems'
const BuyNow = ({product}) => {
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
      <h2>Buy Now</h2>
        <AddItems product={prod}/>
      </Container>
      </>
  )
}

export default BuyNow