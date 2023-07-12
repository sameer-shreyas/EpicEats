import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  let nevigate = useNavigate();
  
  
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", location: ""})

  const handleSubmit = async(e) => {
    e.preventDefault();
      if (credentials.password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    const response = await fetch("http://localhost:5000/api/createuser", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })

    });
    console.log("Hello");
    const json = await response.json();
    console.log(json);
    
    if(!json.success){
        alert("Enter Valid Credentials");
    }else{
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
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
    <div className='container'>
        <form className="w-50 m-auto mt-5 border bg-success border-success rounded" onSubmit={handleSubmit}>
          <div className="m-3">
                <label htmlFor="name" className="form-label text-light">Name</label>
                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="m-3">
                <label htmlFor="email" className="form-label text-light">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
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
            <div className="m-3">
              <label htmlFor="confirmPassword" className="form-label text-light">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"} Confirm Password
                </button>
              </div>
            </div>

            <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-light">Address</label>
                <input type="text" className="form-control" id="exampleInputPassword1" name='location' value={credentials.location} onChange={onChange}/>
            </div>
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>    
    </div>
  )
}

