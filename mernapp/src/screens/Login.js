import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  let nevigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setcredentials] = useState({email: "", password: ""})

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})

    });
    console.log("Hello");
    const json = await response.json();
    console.log(json);
    
    if(!json.success){
        alert("Enter Valid Credentials");
    }
    if(json.success){
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      nevigate("/");
  }

    }
    const onChange = (e) => {
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-success border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone.</div>
          </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </div>
            </div>
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/creatuser" className="m-3 btn btn-danger">I'm a new user</Link>
            </form>
        </div> 
    </div>
  )
}
