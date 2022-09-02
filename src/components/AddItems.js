import React from "react";
import { Container, Card, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddItems = ({ product }) => {
  let navigate = useNavigate();

  const [prod, setProduct] = useState([]);
  
  useEffect(() => {
    
    fetch("http://127.0.0.1:3000/api/products/"+product.pid,{
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((prod) => setProduct(prod));
    
  }, []);

  function AddCart(event) {
    event.preventDefault();

    const data = new FormData();
    const data1 = new FormData();

    const weight_type = document.querySelector(
      'input[name="weight_type"]:checked'
    ).value;
    data.append("cart[user_id]", JSON.parse(Cookies.get("user")).id);
    data1.append("cart_items[product_id]", prod.id);
    data1.append("cart_items[quantity]", event.target.quantity.value);
    data1.append("cart_items[weight_type]", weight_type);

    if (product.type == "addcart") {
      submitToCartAPI(data, data1);
    }
    if(product.type == "editcart"){
      submitToUpdateCartAPI(product.id,data1);
    }
    if(product.type == "buynow"){
      navigate("/buynowpreview",{state: {
        id:prod.id,
        name: prod.name,
        price: prod.price,
        quantity: event.target.quantity.value,
        weight_type: weight_type

      }})
    }
    
  }
  
  // update cart
  function submitToUpdateCartAPI(id,data1){
    fetch("http://127.0.0.1:3000/api/cart_items/"+id,{
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data1
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert(data.message)
        if(data.message == "cart item updated"){
            navigate("/cartitem")
        }
      });
  }
  // check/create/get cart 

  function submitToCartAPI(data, data1) {
    fetch("http://127.0.0.1:3000/api/carts", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data
    })
      .then((response) => response.json())
      .then((data) => submitToCartItemAPI(data, data1))
      .catch((error) => console.error(error));
  }

  // insert cart items
  function submitToCartItemAPI(data, data1) {
    data1.append("cart_items[cart_id]", data.id);
    // console.log(data1)
    fetch("http://127.0.0.1:3000/api/cart_items", {
      method: "POST",
      body: data1,
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert(data.message)
        if(data.message == "alrady exist"){
            navigate("/cartitem")
        }
      })
      .catch((error) => console.error(error));
  }

  // 
  return (
    <Container>
      <Row>
        <form onSubmit={(e) => AddCart(e)}>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
            key={prod.id}
          >
            <Card
              className="mb-3 shadow p-3 mb-5 bg-body rounded"
              style={{ height: "26rem" }}
            >
              <Card.Img
                variant="top"
                src={prod.image_url}
                style={{ height: "10rem", width: "14rem" }}
              />
              <Card.Body>
                <Card.Title className="text-success">{product.name}</Card.Title>
                <Card.Text>Price:{prod.price}</Card.Text>
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  step={0.01}
                  required
                />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="weight_type"
                    id="inlineRadio1"
                    value="Kg"
                    checked
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Kg
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="weight_type"
                    id="inlineRadio2"
                    value="G"
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    G
                  </label>
                </div>
                <br />
                {product.type == "buynow" ? (
                  <button type="submit" className="btn btn-primary">
                    BuyNow
                  </button>
                ) : product.type == "addcart" ? (
                  <button type="submit" className="btn btn-primary">
                    AddCart
                  </button>
                ) : <button type="submit" className="btn btn-primary">
                update
              </button>}
              </Card.Body>
            </Card>
          </div>
        </form>
      </Row>
    </Container>
  );
};

export default AddItems;
