import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const responseData = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const { status, data } = await responseData.json();
        if (status === 200) {
            // save the suth token and redirect
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('name', data.user.name);
            // toast.success(response, {
            //     theme: "colored", 
            //     autoClose: 2000
            // });
            props.showAleart("User logged in successfully","success");
            navigate('/')
        } else {
            // toast.error(response, {
            //     theme: "colored", 
            //     autoClose: 2000
            // });
            props.showAleart("Invalid email/password","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="mx-auto" style={{ width: '500px', height: '700px' }} >
            <div className="card mb-3" style={{ padding: '30px' }}>
                <div className="row g-0 ">
                    <div className="col" >
                        <div className="card-body ">
                            <h4 className="card-title mb-1" style={{ fontSize: '24px', marginBottom: 0, fontWeight: 600 }}>Hello! let's get started</h4>
                            <h6 className="font-weight-light mb-4">Sign in to continue.</h6>
                            <form onSubmit={HandleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-lg" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="Email address" size="lg" required="required" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control form-control-lg" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                                </div>
                                <div className="d-flex">
                                    <button type="submit" className="btn btn-warning btn-block auth-form-btn">Login </button>
                                </div>
                            </form>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            Don't have an account? <Link to="/signup" className="text-primary">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
