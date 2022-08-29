import React from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Cookies from "js-cookie";

const AddItems = ({ product }) => {
  function AddCart(event) {
    event.preventDefault();
    const data = new FormData();
    const weight_type = document.querySelector(
      'input[name="weight_type"]:checked'
    ).value;
    data.append("cart[user_id]",JSON.parse(Cookies.get("user")).id)
    data.append("cart[product_id]", product.id);
    data.append("cart[quantity]", event.target.quantity.value);
    data.append("cart[weight_type]", weight_type);
    submitToAPI(data)    
  }
  function submitToAPI(data) {
    fetch("http://127.0.0.1:3000/api/carts", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <Container>
      <Row>
        <form onSubmit={(e) => AddCart(e)}>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
            key={product.id}
          >
            <Card
              className="mb-3 shadow p-3 mb-5 bg-body rounded"
              style={{ height: "26rem" }}
            >
              <Card.Img
                variant="top"
                src={product.image_url}
                style={{ height: "10rem", width: "14rem" }}
              />
              <Card.Body>
                <Card.Title className="text-success">{product.name}</Card.Title>
                <Card.Text>Price:{product.price}</Card.Text>
                <label>Quantity</label>
                <input type="number" className="form-control" id="quantity" />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="weight_type"
                    id="inlineRadio1"
                    value="Kg"
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
                {/* <Card.Text>Rating:{products.rating}</Card.Text> */}
                {product.type == "buynow" ? (
                  <button type="submit" className="btn btn-primary">
                    BuyNow
                  </button>
                ) : (
                  <button type="addtocart" className="btn btn-primary">
                    AddCart
                  </button>
                )}
              </Card.Body>
            </Card>
          </div>
        </form>
      </Row>
    </Container>
  );
};

export default AddItems;
