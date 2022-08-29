import React from 'react'
import { Card, Container, Row, Button } from "react-bootstrap";

const CartItems = () => {
    const products = []
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
        <h2>My Cart</h2>
        <br />
        <Row>
          {products.map((products) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key=''
            >
              <Card
                className="mb-3 shadow p-3 mb-5 bg-body rounded"
                style={{ height: "23rem" }}
              >
                <Card.Img
                  variant="top"
                  src=''
                  style={{ height: "10rem", width: "14rem" }}
                />
                <Card.Body>
                  <Card.Title className="text-success">
                    Name
                  </Card.Title>

                  <Card.Text>Price:{}</Card.Text>
                  <Card.Text>Rating:{}</Card.Text>
                  <Card.Text>Count:{}</Card.Text>

                  <Button variant="primary">Edit</Button>&nbsp;
                  <Button variant="primary">Delete</Button>

                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default CartItems