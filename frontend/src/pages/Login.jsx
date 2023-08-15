import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonLoader } from '../components/commonLoader';

function Login({ startLoading, stopLoading }) {
  const navigate = useNavigate();
  const showToast = () => {
    toast.success("Login Successfully", { position: toast.POSITION.TOP_CENTER })
  };
  const [getData, setData] = useState({ email: "", pass: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      startLoading(); // Start the loading animation
      const response = await axios.post('http://localhost:8080/login', getData);
      console.log(response.data);
      const { token, id } = response.data;
      console.log("=== from login", id);
      localStorage.setItem('token', token);
      navigate('/');
      showToast();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log('Error:', error.response.data.error);
        alert('Error:', error.response.data.error);
      } else {
        console.error('Error:', error);
      }
    } finally {
      stopLoading(); // Stop the loading animation
    }
  };

  const handleInput = (event) => {
    setData({
      ...getData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a href="#" className="logo d-flex align-items-center w-auto">
                      <span className="d-none d-lg-block">FutureStack </span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login-in Account</h5>
                        <p className="text-center small">Enter your username and password</p>
                      </div>

                      <form method="post" onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Username</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="email" onChange={handleInput} value={getData.email} name="email" className="form-control" id="yourUsername" required />
                            <div className="invalid-feedback">Please enter a correct username.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" onChange={handleInput} value={getData.pass} name="pass" className="form-control" id="yourPassword" required />
                          <div className="invalid-feedback">Please enter your password!</div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">Login</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Don't have an account? <Link to="/register">SING-UP</Link></p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default commonLoader(Login);
