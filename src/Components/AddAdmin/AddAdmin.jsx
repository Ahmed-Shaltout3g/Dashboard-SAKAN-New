import React from 'react'
import Joi from "joi"
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../images/logo.png"
export default function AddAdmin() {
    let [errorList, setErrorList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(
        {
            fullName: "",
            email: "",
            password: "",
            cpassword: "",
            phoneNumber: "",
            typeOfUser: "",
            role: "Admin",
        }
    )


    // get data
    function getUser(e) {
        let _user = { ...user }
        _user[e.target.name] = e.target.value;
        setUser(_user)
        console.log(user)
    }
    function validateRegister() {
        let schema = Joi.object({
            fullName: Joi.string().required().min(3).max(50),

            email: Joi
                .string()
                .email({ tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string().required(),
            cpassword: Joi.string().valid(Joi.ref("password")).required(),
            typeOfUser: Joi.string().valid("owner of real estate", "marketing company", "other").required(),
            phoneNumber: Joi.string().regex(/^(?:\+?20|0)(?:1\d{9}|7\d{8}|8\d{8}|9\d{8})$/),
            role: Joi.string().valid("Admin", "User").required(),

        })
        return (schema.validate(user, { abortEarly: false }))
    }

    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/auth/adminAddUser`, user,

            {
                "Content-Type": "application/json",
            },
        ).then((response) => {
            console.log(response.data?.message)
            setIsLoading(false)
            toast.success(response.data?.message, {
                position: "top-center"
            });

            setUser({
                fullName: "",
                email: "",
                password: "",
                cpassword: "",
                phoneNumber: "",
                typeOfUser: "",
                role: "Admin",
            })

        }).catch((error) => {
            console.log(error.response.data.Error);
            toast.error(error.response.data.Error, {
                position: "top-center"
            });
            setIsLoading(false)

        });
    }
    function submitForm(e) {
        e.preventDefault()
        setIsLoading(true)
        let validation = validateRegister()
        if (validation.error) {
            setIsLoading(false)
            setErrorList(validation.error.details)
            errorList.map((item) => {
                return toast.error(item.message, {
                    position: "top-center"
                });
            })

            console.log(errorList.map((item) => { return item.message }))

        } else {
            console.log('true')
            sendData()
        }

    }

    return <>
        <section className="page">
            <section className="container add-doctor-form">
                <img src={logo} alt="logo" className="logo" />
                <h1 className="form-title">REGISTER A NEW ADMIN</h1>
                <form onSubmit={submitForm} action="">
                    <div className="first-wrapper">

                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                onChange={getUser}
                                name='fullName'
                                value={user.fullName}

                            />

                            <input
                                type="text"
                                placeholder="Email"
                                onChange={getUser}
                                name='email'
                                value={user.email}


                            />
                            <input
                                type="number"
                                placeholder="Mobile Number"
                                onChange={getUser}
                                name='phoneNumber'
                                value={user.phoneNumber}


                            />

                            <input
                                type="password"
                                placeholder="Password"
                                onChange={getUser}
                                name='password'
                                value={user.password}


                            />
                            <input
                                type="password"
                                placeholder="CPassword"
                                onChange={getUser}
                                name='cpassword'
                                value={user.cpassword}


                            />

                            {false ? <input
                                type="text"
                                onChange={getUser}
                                name='role'
                                value={"Admin"}

                            /> : ""}
                            <select
                                name='typeOfUser'
                                value={user.typeOfUser}
                                onChange={getUser}


                            >
                                <option value="">Type Of User</option>
                                <option value="owner of real estate">Owner Of Real Estate</option>
                                <option value="marketing company">Marketing Company</option>
                                <option value="other">Other</option>

                            </select>


                            <button type="submit">{isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : "Register New Admin"}</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
        <ToastContainer />

    </>
}
