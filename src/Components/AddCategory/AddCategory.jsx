import React from 'react'
import Joi from "joi"
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../images/logo.png"

import avatar from "../../images/isolated-avatar-man-and-house-design-removebg-preview.png"
import { useParams } from 'react-router-dom';

export default function AddCategory() {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [docAvatar, setDocAvatar] = useState("");
    const [docAvatarPreview, setDocAvatarPreview] = useState("");
    const formDataToSend = new FormData();


    // handel images 

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setDocAvatarPreview(reader.result);
            setDocAvatar(file);
        };
        setImage(e.target.files[0]);

    };


    const handleDataChange = (e) => {
        setName(e.target.value);
    };

    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/category/create`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": `Ahmed__${localStorage.getItem("user")}`
            },
        }).then((response) => {
            toast.success(response.data.message, {
                position: "top-center"
            });
            console.log(response.data.message);
            setIsLoading(false)
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
        formDataToSend.append('image', image);
        formDataToSend.append('name', name);

        sendData();
        console.log(formDataToSend);
    }



    return <>
        <section className="page">
            <section className="container add-doctor-form">
                <img src={logo} alt="logo" className="logo" />
                <h1 className="form-title">REGISTER A NEW CATEGORY</h1>
                <form onSubmit={submitForm} action="" encType='multibart/form-data'>
                    <div className="first-wrapper">
                        <div>
                            <img
                                src={
                                    docAvatarPreview ? `${docAvatarPreview}` : avatar
                                }
                                alt="Doctor Avatar"
                            />
                            <input multiple type="file" onChange={handleAvatar} />
                        </div>

                        <div>

                            <input
                                className='h-25'
                                type="text"
                                placeholder="Name"
                                onChange={handleDataChange}
                                value={name}
                                name='name'
                            />


                            <button type="submit">{isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : "ADD"}</button>



                        </div>
                    </div>
                </form>
            </section>
        </section>
        <ToastContainer />

    </>
}
