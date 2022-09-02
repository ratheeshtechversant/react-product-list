import React from "react";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  let navigate = useNavigate();

  let total = 0;
  const tax = 2;
  let total_to_pay = 0;
  const [carts, setCarts] = useState([]);
  // const [total, setTotal] = useState(0);
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

  carts.map((carts) => {
    if (carts.weight_type == "Kg") {
      total += carts.price * carts.quantity;
    } else {
      total += (carts.price * carts.quantity) / 1000;
    }
  });

  total_to_pay = total + (total * tax) / 100;

  function confirmOrder() {
    const data = new FormData();
    data.append("order[total_amount]", total);
    data.append("order[tax]", tax);
    data.append("order[total_to_pay]", total_to_pay);
    data.append("order[status]", "active");

    fetch("http://127.0.0.1:3000/api/orders", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data
    })
      .then((response) => response.json())
      .then((order) => {
        window.alert(order.message);
        if(order.message === "order placed"){
          navigate("/cartitem")
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
            {carts.map((carts) => (
              <tr key={carts.id}>
                <td>{carts.name}</td>
                <td>{carts.price}</td>
                <td>
                  {carts.quantity}
                  {carts.weight_type}
                </td>

                <td>
                  {carts.weight_type == "Kg"
                    ? carts.price * carts.quantity
                    : (carts.price * carts.quantity) / 1000}
                </td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th>Grand total</th>
              <th></th>
              <th>{total}</th>
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

export default Checkout;
