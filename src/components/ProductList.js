import React from 'react'
import { Card } from 'react-bootstrap'
const ProductList = ({product}) => {
    // {
    //     product.map((prod) => {
    //       console.log(prod.title)
    //     })
    //   }
    
  return (
      <>
      {
      product.map((product) => (
        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12' key={product.title}>
        <Card className='mb-3 shadow p-3 mb-5 bg-body rounded' style={{ height: '13rem' }}>
            {/* <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" /> */}
            <Card.Body>
                <Card.Title className='text-success'>{product.title}</Card.Title>
                
                <Card.Text>Price:{product.price}
                </Card.Text>
                <Card.Text>Rating:{product.rating}
                </Card.Text>
            </Card.Body>
        </Card> 
    </div>
      ))
      }        
    </>
    )
}

export default ProductList