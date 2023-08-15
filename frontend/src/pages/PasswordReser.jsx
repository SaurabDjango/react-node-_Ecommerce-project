import axios from "axios";
import { useState } from "react";

function PasswordReser() {
    const [password, setPassword] = useState({
        currentPass: "", newPass: "", confirmPass: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:8080/resetPassword', password, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Display the error message in your React component
                console.log('Error:', error.response.data.error);
            } else {
                console.error('Error:', error);
            }
        }
    }
    const handleInput = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current
                        Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="currentPass" type="password" onChange={handleInput} value={password.currentPass} className="form-control" id="currentPassword" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                        Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newPass" type="password" onChange={handleInput} value={password.newPass} className="form-control" id="newPassword" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New
                        Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="confirmPass" type="password" onChange={handleInput} value={password.renewPassword} className="form-control"
                            id="renewPassword" />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>
        </>
    );
}
export default PasswordReser;