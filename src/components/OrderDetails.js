import React from "react";
import { Card, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const [orderitemdetails, setOrderitemdetails] = useState([]);
  const [orders, setOrder] = useState();

  const location = useLocation();

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/orders/" + location.state, {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((order) => {
        setOrder(order);
        console.log(order[0].id);
        fetch("http://127.0.0.1:3000/api/order_items/" + order[0].id, {
          method: "GET",
          headers: {
            Authorization: JSON.parse(Cookies.get("user")).authorization,
          },
        })
          .then((response) => response.json())
          .then((itemdetails) => setOrderitemdetails(itemdetails));
      });
    
  }, []);

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
        <h2>Order Item Details</h2>

        <br />
        <Row>
          {orderitemdetails.map((details) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={details.id}
            >
              <Card
                className="mb-3 shadow p-3 mb-5 bg-body rounded"
                style={{ height: "11rem" }}
              >
                {/* <Card.Img
                  variant="top"
                  src=""
                  style={{ height: "10rem", width: "14rem" }}
                /> */}
                <Card.Body>
                  <Card.Title className="text-success">
                    {details.name}
                  </Card.Title>
                  <Card.Text>Price:{details.price}</Card.Text>
                  <Card.Text>
                    Quantity:{details.quantity}
                    {details.weight_type}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default OrderDetails;
