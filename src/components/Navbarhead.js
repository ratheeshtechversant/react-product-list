import "./Navbarhead.css";
import React, { useState } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import AddProduct from "./AddProduct";
import Cookies from "js-cookie";
import CartItems from "./CartItems";
import OrderItems from "./OrderItems";
import AddToCart from "./AddToCart";
import BuyNow from "./BuyNow";

const Navbarhead = () => {
  const [product, setProduct] = useState([]);

  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [authorization, setAuthentication] = useState("");
  const [image_url, setImage] = useState("");
  const getUser = (uid, email, authorization, image_url) => {
    setUid(uid);
    setEmail(email);
    setAuthentication(authorization);
    setImage(image_url);
    Cookies.set(
      "user",
      JSON.stringify({
        id: uid,
        email: email,
        authorization: authorization,
        image_url: image_url,
      }),
      { expires: 7 }
    );
  };

  const getUid = (uid) => {
    fetch("http://127.0.0.1:3000/api/products/" + uid)
      .then((response) => response.json())
      .then((product) => setProduct(product));
  };
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";

  function Logout() {
    fetch("http://127.0.0.1:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then(Cookies.remove("user"));
  }
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <div className="logo-image">
              <img src={user.image_url} className="img-fluid" />
            </div>
          </Navbar.Brand>
          <Navbar.Brand>{user.email}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="orderitems" className="nav-link">
                My Order
              </Link>

              {/* <Link to="addproduct" className="nav-link">
                AddProduct
              </Link> */}
            </Nav>
            <Link to="cartitem" className="btn btn-primary">
              Cart
            </Link>
            <Form className="d-flex">
              &nbsp;
              {/* <Link to="signup" className="btn btn-primary">
                Sign-up
              </Link>
              &nbsp; */}
              {Cookies.get("user") ? (
                <button className="btn btn-primary" onClick={Logout}>
                  Logout
                </button>
              ) : (
                <Link to="login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<ProductList getUid={getUid} />} />
        <Route path="addtocart" element={<AddToCart product={product} />} />
        <Route path="buynow" element={<BuyNow product={product} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login getUser={getUser} />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="cartitem" element={<CartItems />} />
        <Route path="orderitems" element={<OrderItems />} />
      </Routes>
    </>
  );
};

export default Navbarhead;
