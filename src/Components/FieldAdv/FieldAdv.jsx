import React from 'react'
import Joi from "joi"
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import logo from "../../images/logo.png"

import avatar from "../../images/isolated-avatar-man-and-house-design-removebg-preview.png"
export default function FieldAdv() {


    let { categoryId } = useParams();
    const [propertyDesc, SetPropertyDesc] = useState({ size: 0, view: "", yearOfConstruction: 0, bathrooms: 0, bedrooms: 0, finishingType: "", shahrAqary: "", floor: 0 })
    const [item, setItem] = useState({ title: "", caption: " ", section: "", location: "", descLocation: "", PaymentMethod: "", image: [] })
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    let [errorList, setErrorList] = useState([])
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
        const files = Array.from(e.target.files);
        setImages(files);

    };
    function getItemSpecial(e) {
        let _propertyDesc = { ...propertyDesc };
        _propertyDesc[e.target.name] = e.target.value;
        SetPropertyDesc(_propertyDesc)
        console.log(propertyDesc);

    }

    function getItem(e) {
        let _item = { ...item }
        _item[e.target.name] = e.target.value;
        setItem(_item)
        console.log(item);
    }
    function validateAddProduct() {
        let schema = Joi.object({
            image: Joi.array(),
            title: Joi.string().required(),
            caption: Joi.string().required(),
            price: Joi.number().required(),
            section: Joi.string().valid("rent", "sale").required(),
            location: Joi.string().required(),
            youtubeURL: Joi.string().optional(),
            descLocation: Joi.string().required(),
            rentDeatils: Joi.object({}).optional(),
            propertyDesc: Joi.object({
                size: Joi.number().positive().min(20).required(),
                view: Joi.string(),
                bedrooms: Joi.number().positive(),
                bathrooms: Joi.number().positive(),
                finishingType: Joi
                    .string()
                    .valid("super lux", "lux", "without finished", "Garden", "other"),
                yearOfConstruction: Joi.number().positive(),
                shahrAqary: Joi
                    .string()
                    .valid("registered", "eligible", "not sure")
                    .required(),
                floor: Joi.number().positive(),
            }),
            PaymentMethod: Joi
                .string()
                .valid("cash", "installments", "both")
                .required(),
        })
        return (schema.validate(item, propertyDesc, { abortEarly: false }))
    }
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/product/create?categoryId=${categoryId}`, formDataToSend, {
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
        let validation = validateAddProduct()
        if (validation.error) {
            setIsLoading(false)
            setErrorList(validation.error.details)
            errorList.map((item) => {
                return toast.error(item.message, {
                    position: "top-center"
                });
            })
        } else {
            images.forEach((image, index) => {
                formDataToSend.append(`image`, image);
            });
            formDataToSend.append('title', item.title);
            formDataToSend.append('caption', item.caption);
            formDataToSend.append('price', item.price);
            formDataToSend.append('section', item.section);
            formDataToSend.append('location', item.location);
            formDataToSend.append('descLocation', item.descLocation);
            formDataToSend.append('PaymentMethod', item.PaymentMethod);
            images.forEach((image, index) => {
                formDataToSend.append(`image`, image);
            });
            for (const key in propertyDesc) {
                formDataToSend.append(`propertyDesc[${key}]`, propertyDesc[key]);
            }

            sendData();
            console.log(formDataToSend);
        }
    }


    return <>
        <section className="page">
            <section className="container add-doctor-form">
                <img src={logo} alt="logo" className="logo" />
                <h1 className="form-title">REGISTER A NEW PROPERTY</h1>
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
                            <select
                                onChange={getItem}
                                name='section'
                                id="section"
                                value={item.section}

                            >
                                <option value="">Section</option>
                                <option value="rent">Rent</option>
                                <option value="sale">Sale</option>

                            </select>

                            <input
                                type="text"
                                placeholder="Title"
                                onChange={getItem}
                                value={item.title}
                                name='title'
                            />

                            <input
                                type="number"
                                placeholder="Price EGP*"
                                onChange={getItem}
                                id="price"
                                name='price'
                                value={propertyDesc.price}
                            />
                            <textarea rows={8}
                                placeholder="Caption"
                                onChange={getItem}
                                id="caption"
                                type="text"
                                className="w-100 ps-4 "
                                name='caption'
                            />

                            <input
                                type="text"
                                placeholder="City"
                                onChange={getItem}
                                id="city"
                                name='location'
                                value={item.location}


                            />
                            <input
                                type="number"
                                placeholder="size M2*"
                                id="size"
                                name='size'
                                onChange={getItemSpecial}

                            />

                            <input
                                type="text"
                                placeholder="Address In Details"
                                onChange={getItem}
                                name='descLocation'
                                value={item.descLocation}

                            />
                            <input
                                type="text"
                                placeholder="View"
                                onChange={getItemSpecial}
                                name="view"
                                value={propertyDesc.view}
                                id="view"
                            />


                            <input
                                type="text"
                                placeholder="Year of Property yyyy"
                                onChange={getItemSpecial}
                                name='yearOfConstruction'
                            />
                            <input
                                type="number"
                                placeholder="Numbers of Bathrooms"
                                onChange={getItemSpecial}
                                name='bathrooms'
                            />

                            <input
                                type="number"
                                placeholder="Numbers of Bedrooms"
                                onChange={getItemSpecial}
                                name='bedrooms'
                            />
                            <input
                                type="number"
                                placeholder="Floor"
                                onChange={getItemSpecial}
                                name='floor'
                            />

                            <select
                                onChange={getItemSpecial}
                                id="finishingType"
                                value={propertyDesc.finishingType}
                                name="finishingType"

                            >
                                <option value="">Finishing Type</option>
                                <option value="super lux">Super Lux</option>
                                <option value="lux">Lux</option>
                                <option value="without finished">Without Finished</option>
                                <option value="Garden">Garden</option>
                                <option value="other">Other</option>

                            </select>
                            <select
                                onChange={getItemSpecial}
                                id="shahrAqary"
                                value={propertyDesc.shahrAqary}
                                name="shahrAqary"

                            >
                                <option value="">Shahr Aqary</option>
                                <option value="registered">Registered</option>
                                <option value="eligible">Eligible</option>
                                <option value="not sure">Not Sure</option>

                            </select>
                            <select
                                onChange={getItem}
                                id="PaymentMethod"
                                name="PaymentMethod"
                                value={item.PaymentMethod}

                            >
                                <option value="">Choose Payment method</option>
                                <option value="cash">Cash</option>
                                <option value="installments">Installments</option>
                                <option value="both">Both</option>

                            </select>


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
