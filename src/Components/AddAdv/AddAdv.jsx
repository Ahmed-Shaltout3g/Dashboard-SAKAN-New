import React, { useEffect } from 'react'
import Joi from "joi"
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddAdv() {
    const [categories, setCategories] = useState([])

    async function getCategory() {
        const { data } = await axios.get('https://zunis-node-js.vercel.app/category');
        setCategories(data.categories);
    };
    useEffect(() => {
        getCategory()
        console.log(categories);
    }, [categories])



    return <>
        <div className="page">

            <div className="container pe-md-2">
                <div className='row justify-content-center w-md-0   align-items-center  vh-100'>
                    {categories.length > 0 ? categories.map((item, index) => (
                        <div key={index} className="col-md-4  d-flex justify-content-center "><Link to={`/fieldAdv/${item._id}`} ><button className=' add-buttons' type='submit'>ADD {item.name.toUpperCase()}</button></Link></div>
                    )) : <div className='add-buttons'>"No Categories yet"</div>}

                </div>
            </div>
        </div>
    </>




}
