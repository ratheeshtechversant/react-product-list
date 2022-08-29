import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
const AddProduct = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("product[name]", event.target.name.value);
    data.append("product[price]", event.target.price.value);
    data.append("product[rating]", event.target.rating.value);
    data.append("product[image]", event.target.image.files[0]);
    submitToAPI(data);
  }
  function submitToAPI(data) {
    fetch("http://127.0.0.1:3000/api/products", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  return (
    <>
      <Container>
        <div>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="col-sm-4 offset-sm-3">
          <h3>Add Product</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label>name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label>Rating</label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="rating"
                id="rating"
                className="form-control"
              />
              <label>Image</label>
            </div>
            <div className="mb-3">
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                create
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddProduct;
