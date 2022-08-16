import React,{ useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
const ProductList = ({product}) => {
    // {
    //     product.map((prod) => {
    //       console.log(prod.title)
    //     })
    //   }

    const [products, setProduct] = useState([])
    useEffect(() => {
      fetch('http://127.0.0.1:3000/api/products')
      .then(response => response.json())
      .then(products => setProduct(products))
    },[])
    console.log(products)
  return (
      <>
      {
      products.map((products) => (
        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12' key={products.id}>
        <Card className='mb-3 shadow p-3 mb-5 bg-body rounded' style={{ height: '13rem' }}>
            {/* <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" /> */}
            <Card.Body>
                <Card.Title className='text-success'>{products.name}</Card.Title>
                
                <Card.Text>Price:{products.price}
                </Card.Text>
                <Card.Text>Rating:{products.rating}
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