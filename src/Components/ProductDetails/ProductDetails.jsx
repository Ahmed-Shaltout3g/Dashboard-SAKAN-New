import React from 'react'
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import fakeImage from "../../images/Annotation 2024-02-21 205940.png"
import { Helmet } from "react-helmet";
import style from "./Products.module.css"

export default function ProductDetails() {
    let { name, id } = useParams();
    const [product, setProduct] = useState([]);
    async function getProduct() {
        const { data } = await axios.get(`https://zunis-node-js.vercel.app/product/${name}/${id}`);
        setProduct(data.products)
    };
    useEffect(() => {
        getProduct();
        window.scroll(0, 0)
    }, []);
    useEffect(() => {
        getProduct();
    }, [product.length]);
    return <>
        <Helmet>
            property details - Sakan"
        </Helmet>

        <div className="j py-5">
            <div className="container py-5 ">
                {product.length <= 0 ? <div className="row g-4 ">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
                        <img src={fakeImage} className="card-img-top rounded-0 w-100" alt="..." />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6 w-100"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>

                                <span className="placeholder col-4"></span>
                            </p>
                        </div>
                    </div>
                </div> : <div className="row g-4">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 position-relative overflow-hidden">
                        <div className={`${style.box}  d-flex overflow-x-scroll ${style.scroly}`}>
                            {product.Images.map((item, index) => <img key={index} src={item.secure_url} className="  w-100 " alt="" />)}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h3>
                            {product.price} EGP
                        </h3>
                        <p className="fw-bold">{product.location}</p>
                        <div className="d-flex">
                            <i className="fa-solid fa-bed "></i>
                            <p className="mx-2">{product.propertyDesc.bedrooms}  Bedrooms</p>
                        </div>
                        <div className="d-flex">
                            <i className="fa-solid fa-toilet"></i>
                            <p className="mx-2">{product.propertyDesc.bathrooms} Bathrooms</p>
                        </div>
                        <div className="d-flex">
                            <i className="fa-solid fa-border-all"></i>
                            <p className="mx-2">{product.propertyDesc.size} m2</p>
                        </div>
                        <p className="fs-5 fw-bold">{product.title}</p>
                        <p>{product.caption}</p>
                        <div className="d-flex">
                            <p> Floor : {product.propertyDesc.floor} | </p>
                            <p>   Year : {product.propertyDesc.yearOfConstruction}|</p>
                            <p>   Finishing Type : {product.propertyDesc.finishingType} </p>
                        </div>
                        <p> date : {product.createdAt}</p>
                        <div className="d-flex">
                            <button type="button" className={` px-4 py-2 fw-bold m-2  rounded-1 ${style.contactButton} mx-2`} data-bs-toggle="modal" data-bs-target="#exampleModal">

                                Phone
                            </button>
                            <button type="button" className={` px-4 py-2 fw-bold  m-2 rounded-1 ${style.contactButton} mx-2`} data-bs-toggle="modal" data-bs-target="#exampleModal">

                                Mail
                            </button>

                            <div className="modal fade my-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog my-5">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>
                                                Phone : {product.createdBy.phoneNumber}
                                            </p>
                                            <p>
                                                Email : {product.createdBy.email}


                                            </p>
                                        </div>
                                        <div className="modal-footer">
                                            <a href={`mailto:${product.createdBy.email}?subject=Subject line`}>
                                                <button type="button" className={` px-4 py-2 fw-bold  rounded-1 ${style.contactButton} mx-2`}>
                                                    Send Messange

                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div >
        </div>
    </>
}
