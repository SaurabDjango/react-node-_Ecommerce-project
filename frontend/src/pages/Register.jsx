import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City } from "country-state-city";
import Select from "react-select";

function Register() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const navigate = useNavigate(null);
    const [getData, setData] = useState(({
        name: "", lastname: "", username: "", address: "", city: "", state: "", pass: "", image: null,
    }));

    useEffect(() => {
        console.log(selectedCountry);
        console.log(selectedCountry?.isoCode);
        console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
    }, [selectedCountry]);

    const handleSubmit = (e) => {
        e.preventDefault();        
        const selectedCityinfo = {
            country: selectedCountry ? selectedCountry.name : '',
            state: selectedState ? selectedState.name : '',
            city: selectedCity ? selectedCity.name : ''
        };
        const requestData = {
            ...getData,
            ...selectedCityinfo
        };

        axios.post('http://localhost:8080/register', requestData)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    navigate('/VerifyOtp')
                } else {

                }
            }).catch(error => {
                alert("user exist with this email id")
                console.log(error);
            })
    }

    const handleInput = (e) => {
        setData({
            ...getData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleFileChange = (e) => {
    //     setData({
    //         ...getData,
    //         image: e.target.files[0],
    //     });
    // };


    // const handleSelect = (event) => {
    //     setData({
    //         ...getData,
    //         select: event.target.value,
    //     })
    // }
    return (
        <>
            <main>
                <div className="container">
                    <ToastContainer />
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                                            {/* <img src={logo} alt="" /> */}
                                            <span className="d-none d-lg-block">FutureStack</span>
                                        </a>
                                    </div>
                                    {/* End Logo */}
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                                <p className="text-center small">Enter your personal details to create account</p>
                                            </div>
                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit} encType='multipart/form-data' noValidate>
                                                <div className="col-12">
                                                    {/* <label for="yourName" className="form-label">Your Name</label> */}
                                                    <input type="text" onChange={handleInput} value={getData.name} name="name" className="form-control" placeholder="Your Name" required />
                                                    <div className="invalid-feedback">Please, enter your name!</div>
                                                </div>

                                                <div className="col-12">
                                                    {/* <label for="yourName" className="form-label">Your Sir-Name</label>                                                     */}
                                                    <input type="text" onChange={handleInput} value={getData.lastname} name="lastname" className="form-control" placeholder="Your Sir-Name" required />
                                                    <div className="invalid-feedback">Please, enter your SirName!</div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="text" onChange={handleInput} value={getData.username} name="username" className="form-control" id="yourUsername" placeholder="Email as Username" required />
                                                        <div className="invalid-feedback">Please choose a username.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <textarea className="form-control" onChange={handleInput} value={getData.address} name="address" rows="2" placeholder="Your Address"></textarea>
                                                    <div className="invalid-feedback">Please, enter your SirName!</div>
                                                </div>

                                                <div className="col-12">
                                                    <Select
                                                        options={Country.getAllCountries()}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.name}
                                                        value={selectedCountry}
                                                        onChange={(item) => setSelectedCountry(item)}
                                                        name='country'
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <Select
                                                        options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.name}
                                                        value={selectedState}
                                                        onChange={(item) => setSelectedState(item)}
                                                        name='state'
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <Select
                                                        options={
                                                            selectedState
                                                                ? City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode)
                                                                : []
                                                        }
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.name}
                                                        value={selectedCity}
                                                        onChange={(item) => setSelectedCity(item)}
                                                        name='city'
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <input type="password" onChange={handleInput} value={getData.pass} name="pass" className="form-control" id="yourPassword" placeholder="Create Password" required />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                        <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                                                        <div className="invalid-feedback">You must agree before submitting.</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" onChange={handleInput} type="submit">Create Account</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Already have an account? <Link to={'/login'}>Log in</Link></p>
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

export default Register;