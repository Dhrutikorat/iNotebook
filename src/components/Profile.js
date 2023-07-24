import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {

    const [editedProfile, setEditedProfile] = useState({ id: "", name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        getProfile();
        // if (Object.keys(error).length === 0 && isSubmit === true) {
        // const responseData =  fetch(`http://localhost:5000/api/user/update/${editedProfile.id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'auth-token': localStorage.getItem('token')
        //     },
        //     body: JSON.stringify(editedProfile),
        // });

        // const { data } =  responseData.json();
        // setEditedProfile({ id: data._id, name: data.name, email: data.email, password: "", confirmPassword: "" });
        // props.showAleart("User profile updated successfully", "success");
        // }
    }, []);

    const getProfile = async () => {
        const responseData = await fetch('http://localhost:5000/api/auth/getUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const { data } = await responseData.json();
        setEditedProfile({ id: data._id, name: data.name, email: data.email, password: "", confirmPassword: "" });
    }

    const onChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
    }

    const validate = (editedProfile) => {
        const errors = {};

        if (!editedProfile.name) {
            errors.name = "Name is required";
        } else if (editedProfile.name.length < 3) {
            errors.name = "Name must be atleast 3 characters";
        }

        if (!editedProfile.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(editedProfile.email)) {
            errors.email = 'Invalid email address'
        }

        if (editedProfile.password && editedProfile.password !== "") {
            if (editedProfile.password.length < 6) {
                errors.password = "Password must be atleast 6 characters";
            } else if (editedProfile.password !== editedProfile.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match'
            }
        }
        return errors;
    }

    const handleClick = (e) => {
        e.preventDefault();
        setError(validate(editedProfile));

        if (error && Object.keys(error).length === 0) {
            if (editedProfile.password !== "") {
                editUser(editedProfile.name, editedProfile.email, editedProfile.password);
            } else {
                editUser(editedProfile.name, editedProfile.email);
            }
        }

        localStorage.setItem('name', editedProfile.name);
    }

    const editUser = async (name, email, password) => {
        const responseData = await fetch(`http://localhost:5000/api/user/update/${editedProfile.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, password }),
        });

        const { data } = await responseData.json();
        props.showAleart("User profile updated successfully", "success");
        setEditedProfile({ id: data._id, name: data.name, email: data.email, password: "", confirmPassword: "" });
    }

    const clearForm = (e) => {
        e.preventDefault();
        getProfile();
    }

    return (
        <>
            <section className="vh-100">
                <div className="row d-flex  mt-4 justify-content-start h-100">
                    <div className="col col-md-12 col-lg-7 col-xl-2">
                        <h4 className='mb-4'> Personal Information </h4>
                    </div>
                    <div className="col col-md-12 col-lg-7 col-xl-5">
                        <div className="card" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-grow-1 ms-3">
                                        <form>
                                            <div className="mb-3 mt-4" >
                                                <input type="text" className="form-control" id="name" name='name' placeholder="Name" size="lg" value={editedProfile.name} onChange={onChange} />
                                                {error.name && <span className="px-1" style={{ color: 'red' }}>{error.name}</span>}
                                            </div>
                                            <div className="mb-3" >
                                                <input type="text" className="form-control" id="email" name='email' placeholder="Email address" size="lg" value={editedProfile.email} onChange={onChange} />
                                                {error.email && <span className="px-1" style={{ color: 'red' }}>{error.email}</span>}
                                            </div>
                                            <div className="mb-3 mt-4" >
                                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" size="lg" value={editedProfile.password} onChange={onChange} />
                                                {error.password && <span className="px-1" style={{ color: 'red' }}>{error.password}</span>}
                                            </div>
                                            <div className="mb-4">
                                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" size="lg" value={editedProfile.confirmPassword} onChange={onChange} />
                                                {error.confirmPassword && <span className="px-1" style={{ color: 'red' }}>{error.confirmPassword}</span>}
                                            </div>
                                        </form>
                                        <div className="pt-1 d-flex justify-content-end mt-4">
                                            <button className="btn btn-outline-warning me-2" onClick={clearForm}>Cancel</button>
                                            <button type="submit" className="btn btn-outline-warning" onClick={handleClick}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
