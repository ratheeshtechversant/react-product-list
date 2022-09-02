import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BuyNowPreview = () => {
  const navigate = useNavigate()
  const location = useLocation();
  let total_amount = 0;
  const tax = 2;
  let total_to_pay = 0;
  if (location.state.weight_type == "Kg") {
    total_amount = location.state.price * location.state.quantity;
  } else {
    total_amount = (location.state.price * location.state.quantity) / 1000;
  }
  total_to_pay = total_amount + (total_amount * tax) / 100;

  function confirmOrder() {
    const data = new FormData();
    data.append("order[product_id]", location.state.id);
    data.append("order[quantity]", location.state.quantity);
    data.append("order[weight_type]", location.state.weight_type);


    data.append("order[total_amount]", total_amount);
    data.append("order[tax]", tax);
    data.append("order[total_to_pay]", total_to_pay);
    data.append("order[status]", "active");

    fetch("http://127.0.0.1:3000/api/orders/0/buynow", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data
    })
      .then((response) => response.json())
      .then((order) => {
        window.alert(order.message)
        console.log(order)
        if(order.message === "order placed"){
          navigate("/orderitems")
        }
      });
  }

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Container>
        <h2>Place Order</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>quantity</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{location.state.name}</th>
              <th>{location.state.price}</th>
              <th>{location.state.quantity}</th>
              <th>{total_amount}</th>
            </tr>
            <tr>
              <th></th>
              <th>tax</th>
              <th></th>
              <th>{tax}%</th>
            </tr>
            <tr>
              <th></th>
              <th>Total To Pay</th>
              <th></th>
              <th>{total_to_pay}</th>
            </tr>
          </tbody>
        </Table>
        <button className="btn btn-primary" onClick={confirmOrder}>
          Confirm Order
        </button>
      </Container>
    </>
  );
};

export default BuyNowPreview;
