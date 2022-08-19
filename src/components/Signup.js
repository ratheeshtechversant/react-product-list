import React ,{useState} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
const Signup = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password_confirmation,setPasswordConfirm] = useState("")

    function SignUp(){
        if (email !== "" && password !== "" && password_confirmation !==""){
        if(password === password_confirmation){
            axios.post('http://127.0.0.1:3000/users',
            {
            user: {email : email,
                password :password,
                password_confirmation : password_confirmation
                }
            }
            ).then(result => {
                window.alert(result.data.message)
                // console.log(result.data.message)
            })
            .catch(error => {
                window.alert(error)
            })}
            else{
                window.alert("password mismatch")

            }
        }
        else{
            window.alert("cannot submit empty field")
        }
    }

  return (
    <>
    <Container>
        <div>
            <br/><br/><br/><br/>
        </div>
            <div className='col-sm-4 offset-sm-3'>
            <h3>Sign Up</h3>
        
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <label> Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                </div>
                <div className="mb-3">
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirm(e.target.value)}

                />
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary"
                onClick={SignUp}>
                    Sign Up
                </button>
                </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </div>
      </Container>
    </>
  )
}

export default Signup