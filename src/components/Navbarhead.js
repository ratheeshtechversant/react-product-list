import "./Navbarhead.css";
import React, { useState } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import AddProduct from "./AddProduct";
import Cookies from "js-cookie";
import CartItems from "./CartItems";
import OrderItems from "./OrderItems";
import AddToCart from "./AddToCart";
import BuyNow from "./BuyNow";
import EditCart from "./EditCart";
import Checkout from "./Checkout";
import OrderDetails from "./OrderDetails";
import BuyNowPreview from "./BuyNowPreview";

const Navbarhead = () => {
  let navigate = useNavigate()
  const [product, setProduct] = useState([]);

  const [pid, setPid] = useState();
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

  function getUid(pid) {
    setPid(pid);
  }

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";

  function Logout() {
    fetch("http://127.0.0.1:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then(!Cookies.remove("user") ? navigate("/") : window.alert("sign-out faild"));
  }
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container fluid>
          {Cookies.get("user") ? (
            <>
              <Navbar.Brand href="#">
                <div className="logo-image">
                  <img src={user.image_url} className="img-fluid" />
                </div>
              </Navbar.Brand>
              <Navbar.Brand>{user.email}</Navbar.Brand>
            </>
          ) : (
            <Navbar.Brand>user</Navbar.Brand>
          )}

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
              {Cookies.get("user") ? (
                <Link to="orderitems" className="nav-link">
                  My Order
                </Link>
              ) : (
                ""
              )}
              {/* <Link to="orderitems" className="nav-link">
                My Order
              </Link> */}

              {/* <Link to="addproduct" className="nav-link">
                AddProduct
              </Link> */}
            </Nav>

            <Form className="d-flex">
              &nbsp;
              {/* <Link to="signup" className="btn btn-primary">
                Sign-up
              </Link>
              &nbsp; */}
              {Cookies.get("user") ? (
                <>
                  <Link to="cartitem" className="btn btn-primary">
                    Cart
                  </Link>
                  &nbsp;
                  <button className="btn btn-primary" onClick={Logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="signup" className="btn btn-primary">
                    Sign-up
                  </Link>
                  &nbsp;
                  <Link to="login" className="btn btn-primary">
                    Login
                  </Link>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<ProductList getUid={getUid} />} />
        <Route path="addtocart" element={<AddToCart product={pid} />} />
        <Route path="buynow" element={<BuyNow product={pid} />} />
        <Route path="editcart" element={<EditCart />} />
        <Route path="orderdetails" element={<OrderDetails />} />
        <Route path="buynowpreview" element={<BuyNowPreview />} />

        <Route path="login" element={<Login getUser={getUser} />}></Route>
        <Route path="signup" element={<Signup />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="cartitem" element={<CartItems />} />
        <Route path="orderitems" element={<OrderItems />} />
        <Route path="checkout" element={<Checkout />} />

      </Routes>
    </>
  );
};

export default Navbarhead;
