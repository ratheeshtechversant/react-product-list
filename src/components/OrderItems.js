import React from 'react'
import { Card, Container, Row, Button } from 'react-bootstrap'
import { useEffect,useState } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const OrderItems = () => {

  let navigate = useNavigate()

  const [order_list,setOrder] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/orders", {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((orders) => setOrder(orders));
  }, []);
  
  function orderCancel(id){
    fetch("http://127.0.0.1:3000/api/orders/"+id, {
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((ordercancel) => {
        window.alert(ordercancel.message)
        window.location.reload(false);
      });
  }

  function orderDetails(id){
      navigate("/orderdetails",{state: id})
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
      <h2>My Order</h2>
      <br />
      <Row>
          {order_list.map((order,i) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={order.id}
            >
              <Card
                className="mb-3 shadow p-3 mb-5 bg-body rounded"
                style={{ height: "16rem" }}
              >
                
                <Card.Body>
                  <Card.Title className="text-success">Order:{i+1}
                  </Card.Title>
                  <Card.Text>Toral Price:{order.total_amount}</Card.Text>
                  <Card.Text>
                    Tax:{order.tax}
                   
                  </Card.Text>
                  <Card.Text>
                    Payable Amount:{order.total_to_pay}
                   
                  </Card.Text>
                  <Button 
                  variant="primary"
                  onClick={() => orderDetails(order.id)}
                  >details</Button>&nbsp;
                  { order.status === "active" ?
                  <Button
                    variant="primary"
                    onClick={() => orderCancel(order.id)}
                  >
                    cancel
                  </Button>
                  :
                  <Button
                    variant="warning"
                    
                  >
                    cancelled
                  </Button>}
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
    </Container>
    </>
  )
}

export default OrderItems