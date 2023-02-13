import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const responseData = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })

        const { status, authToken, response } = await responseData.json();

        if (status === 200) {
            // save the suth token and redirect
            localStorage.setItem('token', authToken);
            toast.success(response,{
                theme: "colored", 
                autoClose: 2000
            });
            navigate('/')
        } else {
            toast.error(response,{
                theme: "colored", 
                autoClose: 2000
            });
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="mx-auto" style={{ width: '500px', height: '700px' }} >
            <div className="card mb-3" style={{ padding: '30px' }}>
                <div className="row g-0">
                    <div className="col" >
                        <div className="card-body">
                            <h4 className="card-title mb-1" style={{ fontSize: '24px', marginBottom: 0, fontWeight: 600 }}>New here?
                            </h4>
                            <h6 className="font-weight-light mb-4">Signing up is easy. It only takes a few steps</h6>
                            <form onSubmit={HandleSubmit} autoComplete="off">
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-lg" id="name" name='name' value={credentials.name} onChange={onChange} placeholder="Name" size="lg" minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control form-control-lg" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="Email address" size="lg" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control form-control-lg" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" minLength={6} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control form-control-lg" id="cpassword" value={credentials.cpassword} name="cpassword" onChange={onChange} placeholder="Confirm password" minLength={6} required/>
                                </div>
                                <div className="d-flex">
                                    <button type="submit" className="btn-gradient-primary btn-block auth-form-btn" >Sign up </button>
                                </div>
                            </form>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            Already have an account? <Link to="/login" className="text-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
