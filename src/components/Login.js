import React,{useState,useEffect} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie';


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [user1,setUser] = useState("")
    function LogIn(){
       
        axios.post('http://localhost:3000/users/sign_in',
        {
           user: {email : email,
            password :password,
            }
        }
        ).then(result => {
            window.alert("Email : "+ result.data.user.email)
            setUser(result.data)
            
        })
        .catch(error => {
            window.alert(error.response.data.error)
            console.log(error)
        })

    }
    function Show(){
      // window.alert(user1.image_url.image_url)
      document.getElementById('email').innerHTML = user1.image_url.email
      document.getElementById('img').src = user1.image_url.image_url

    }
  return (
    <Container>
        <div>
        <br/><br/><br/><br/>
      </div>
      
      <div className='col-sm-4 offset-sm-3'>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
         <div className="d-grid">
          <button type="submit" className="btn btn-primary"
          onClick={LogIn}>
            Login
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </div>
      
          <h6>
          </h6>
          <button type="submit" className="btn btn-primary"
          onClick={Show}>
            show User
          </button>
          <div><h4 id='email'></h4>
          <img id='img' src='' style={{height: '17rem', width: '14rem'}}/>
          </div>
    </Container>
  )
}

export default Login