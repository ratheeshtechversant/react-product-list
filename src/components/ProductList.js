import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = ({getUid}) => {


  const [products, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/products")
      .then((response) => response.json())
      .then((products) => setProduct(products));
  }, []);
  console.log(products);
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
        <h2>Product List</h2>
        <br />
        <Row>
          {products.map((products) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={products.attributes.id}
            >
              <Card
                className="mb-3 shadow p-3 mb-5 bg-body rounded"
                style={{ height: "23rem" }}
              >
                <Card.Img
                  variant="top"
                  src={products.attributes.image_url}
                  style={{ height: "10rem", width: "14rem" }}
                />
                <Card.Body>
                  <Card.Title className="text-success">
                    {products.attributes.name}
                  </Card.Title>
                  <Card.Text>Price:{products.attributes.price}</Card.Text>
                  <Card.Text>Rating:{products.attributes.rating}</Card.Text>
                  <Link
                    to="buynow"
                    className="btn btn-primary"
                    onClick={() => getUid(products.attributes.id)}
                  >
                    BuyNow
                  </Link>{" "}
                  &nbsp;
                  <Link
                    to="addtocart"
                    className="btn btn-primary"
                    onClick={() => getUid(products.attributes.id)}
                  >
                    AddCart
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
