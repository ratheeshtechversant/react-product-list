import React from 'react'
import { Container } from 'react-bootstrap'
import AddItems from './AddItems'
const BuyNow = ({product}) => {
    product['type'] = 'buynow'
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
        <AddItems product={product}/>
      </Container>
      </>
  )
}

export default BuyNow