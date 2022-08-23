import React ,{useState} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
const Signup = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password_confirmation,setPasswordConfirm] = useState("")

    function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();

        data.append("user[email]",email);
        data.append("user[password]",password);
        data.append("user[password_confirmation]",password_confirmation);
        data.append("user[image]", event.target.image.files[0]);
        submitToAPI(data)

    }

    

    function submitToAPI(data){
        if (email !== "" && password !== "" && password_confirmation !==""){
        if(password === password_confirmation){
            // axios.post('http://127.0.0.1:3000/users',
            // {
            // user: {email : email,
            //     password :password,
            //     password_confirmation : password_confirmation,
            //     image :image
            //     }
            // }
            // ).then(result => {
            //     window.alert(result.data.message)
            //     // console.log(result.data.message)
            // })
            // .catch(error => {
            //     window.alert(error)
            // })
            fetch('http://127.0.0.1:3000/users',{
            method: "POST",
            body: data
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error(error))
            
            }
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
            <form onSubmit={(e) => handleSubmit(e)}>

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
                <div className="mb-3">
                <label>Image</label>
                <input type='file' name='image' id='image' />
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
                </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        </form>

      </div>
      </Container>
    </>
  )
}

export default Signup