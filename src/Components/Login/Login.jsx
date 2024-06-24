import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import Joi from "joi"
import axios from "axios"
import logo from "../../images/logo.png"


export default function Login() {
    let navigate = useNavigate()
    let { setData } = useContext(authContext)

    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "Admin"
    })
    const [error, setError] = useState('')
    const [errorList, setErrorList] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // get user Login Info
    function getUserInfoLogin(e) {
        let _user = { ...user }
        _user[e.target.name] = e.target.value;
        setUser(_user)
    }
    // validation
    function LoginValidator() {
        let schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
        })
        return schema.validate(user, { abortEarly: false })
    }

    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/auth/signin`, user).then((response) => {
            localStorage.setItem('user', response.data.token);
            console.log(response.data.token);
            navigate("/home");

            setIsLoading(false);

        }).catch((error) => {
            setError(error.response.data.Error)
            console.log(error)
            setIsLoading(false);
        })
    }
    function submitLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setErrorList("")
        let validation = LoginValidator()
        if (validation.error) {
            setIsLoading(false)
            setError("")

            setErrorList(validation.error.details)
            console.log(errorList)
        } else {
            sendData()

        }


    }




    return <>
        <div className='login-background'>
            <section className="container form-component ">
                <img src={logo} alt="logo" className="logo" />
                <h1 className="form-title">WELCOME TO SAKAN</h1>
                <p>Only Admins Are Allowed To Access These Resources!</p>
                <form onSubmit={submitLogin}>
                    <input
                        onChange={getUserInfoLogin}
                        type="text"
                        placeholder="Email"
                        name="email"

                    />
                    <input
                        onChange={getUserInfoLogin}
                        type="password"
                        placeholder="Password"
                        name='password'
                    />
                    {false ? <input onChange={getUserInfoLogin} name="role" value={"Admin"} type="text" />
                        : ""}
                    {error ? <p className="text-danger">{error}</p> : ""}
                    {errorList.length > 0 ? <ul>
                        {errorList.map((item, index) => <li className="text-danger" key={index}>{item.message}</li>)}

                    </ul> : ""}
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">{isLoading ? <div className="spinner-border " role="status">
                            <span className="visually-hidden  ">Loading...</span>
                        </div> : "Login"}</button>
                    </div>

                </form>
            </section>
        </div>

    </>
}
