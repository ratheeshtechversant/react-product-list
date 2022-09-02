import React from "react";
import { Card, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  let navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  useEffect(() => {
    
    fetch("http://127.0.0.1:3000/api/cart_items", {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((carts) => setCarts(carts));
  }, []);


  // console.log(carts)
  function deleteItem(id) {
    fetch("http://127.0.0.1:3000/api/cart_items/" + id, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((del) => {
        window.alert(del.message);
        if (del.message == "delete successfull") {
          window.location.reload(false);
        }
      });
  }

  function editItem(cid,pid){
    // window.alert(pid)
    navigate("/editcart",{state: {id: cid,pid: pid}})
  }

  function checkOut(){
    navigate("/checkout")
  }
  // console.log(carts)
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
        <div>
        {carts.length != 0 ?
        <Button 
                  variant="primary"
                  onClick={checkOut}
                  >Checkout</Button>
              :
              <h5>Cart empty</h5>}
        </div>
        <br />
        <Row>
          {carts.map((carts) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={carts.id}
            >
              <Card
                className="mb-3 shadow p-3 mb-5 bg-body rounded"
                style={{ height: "14rem" }}
              >
                {/* <Card.Img
                  variant="top"
                  src=""
                  style={{ height: "10rem", width: "14rem" }}
                /> */}
                <Card.Body>
                  <Card.Title className="text-success">{carts.name}</Card.Title>
                  <Card.Text>Price:{carts.price}</Card.Text>
                  <Card.Text>
                    Quantity:{carts.quantity}
                    {carts.weight_type}
                  </Card.Text>
                  <Button 
                  variant="primary"
                  onClick={() => editItem(carts.id,carts.product_id)}
                  >Edit</Button>&nbsp;
                  <Button
                    variant="primary"
                    onClick={() => deleteItem(carts.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CartItems;
