import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const VerifyOtp = () => {
    const [getData, setData] = useState({
        otp:'',
    })
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email')
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {getData,email}
        axios.post('http://localhost:8080/verify', data)
             .then((res) => {
                console.log(res.data)
                if(res.data) {
                    navigate('/login')
                }
             })
             .catch(err => {
                console.error(err);
             })
     }
    const handleInput = (e) => {
        setData({
            ...getData,
            [e.target.name]:e.target.value,
        })
     }
    return (
        <>
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center" style={{marginTop:'5%'}}>
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <a href="#" className="logo d-flex align-items-center w-auto">
                                            {/* <img src={logo} alt="" /> */}
                                            <span className="d-none d-lg-block">FutureStack </span>
                                        </a>
                                    </div>
                                    {/* End Logo */}

                                    <div className="card mb-3" style={{marginTop:'5%'}}>

                                        <div className="card-body" style={{marginTop:'5%'}}>

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Verify Account</h5>
                                                <p className="text-center small">Enter your OTP here</p>
                                            </div>

                                            <form method="post" onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>

                                                <div className="col-12">
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="email" onChange={handleInput} value={getData.otp} name="otp" className="form-control" id="yourUsername" required />
                                                        <div className="invalid-feedback">Please Enter correct Username.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <button onChange={handleInput} className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have an account? <Link to={'/register'}> SING-UP</Link></p>
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
};
export default VerifyOtp;