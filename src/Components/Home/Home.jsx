import React, { useContext, useEffect, useState } from 'react'
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { authContext } from '../../Context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { TbListDetails } from "react-icons/tb";
import house from "../../images/isolated-avatar-man-and-house-design-removebg-preview.png"
export default function Home() {
    const { userData } = useContext(authContext)
    const [Products, setProducts] = useState([])
    const [selectData, setSelectData] = useState("Pending")
    const [ProductsAccepted, setProductsAccepted] = useState([])
    const [token, setToken] = useState(localStorage.getItem("user"));
    console.log(userData);
    async function getProducts() {
        const { data } = await axios.get('https://zunis-node-js.vercel.app/product/?page=1&isAccepted=false');
        setProducts(data.data)

    };

    async function getProductsAccepted() {
        const { data } = await axios.get('https://zunis-node-js.vercel.app/product/?page=1&isAccepted=true');
        setProductsAccepted(data.data)

    };

    useEffect(() => {
        if (selectData === 'Pending') {
            getProducts();
        } else if (selectData === 'Accepted') {
            getProductsAccepted()
        }
    }, [selectData]);


    function handelSelectData(e) {
        setSelectData(e.target.value)
        console.log(selectData);
    }
    // accept Product
    async function acceptProduct(id) {

        await axios.put(`https://zunis-node-js.vercel.app/product/accept?productId=${id}`, null, {
            headers: {
                "token": `Ahmed__${token}`
            },
        })
            .then(response => {
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "top-center"
                });
                getProducts();

            })
            .catch(error => {
                console.error(error.response.data.Error);
                toast.error(error.response.data.Error, {
                    position: "top-center"
                });
            });

    }
    // delete Product
    async function deleteProduct(id) {

        await axios.delete(`https://zunis-node-js.vercel.app/product/delete?productId=${id}`, {
            headers: {
                "token": `Ahmed__${token}`
            },
        })
            .then(response => {
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "top-center"
                });
                getProducts();

            })
            .catch(error => {
                console.error(error);
                toast.success("Done", {
                    position: "top-center"
                });
                getProducts();

            });

    }





    return <>

        <section className="dashboard page">
            <div className="banner">
                <div className="firstBox">
                    <img src={house} alt="man-and-house" />
                    <div className="content">
                        <div>
                            <p>Hello ,</p>
                            <h5>
                                {userData?.fullName}
                            </h5>
                        </div>
                        <p>
                            Only Admins Are Allowed To Access These Resources!
                        </p>
                    </div>
                </div>
                <div className="secondBox">
                    <p>Total Unit Pending</p>
                    <h3>{Products?.length}</h3>
                </div>
                <div className="thirdBox">
                    <p>Unit Accepted</p>
                    <h3>{ProductsAccepted ? ProductsAccepted?.length : 0}</h3>
                </div>
            </div>
            <div className="banner">
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-md-6">
                            <h5>Appointments</h5>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <select
                                className={
                                    selectData === "Pending"
                                        ? "value-pending"
                                        : "value-accepted"

                                }
                                value={selectData}
                                onChange={handelSelectData}
                            >
                                <option value="">Select</option>
                                <option value="Pending" className="value-pending">
                                    Pending
                                </option>
                                <option value="Accepted" className="value-accepted">
                                    Accepted
                                </option>

                            </select>

                        </div>
                    </div>

                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>createdAt</th>
                            <th>Section</th>
                            <th>price</th>
                            <th>Location</th>
                            <th>Details</th>

                            <th>Status</th>


                        </tr>
                    </thead>
                    <tbody>
                        {Products && Products?.length > 0
                            ? selectData == "Pending" ? Products.map((Product) => (
                                <tr key={Product._id}>
                                    <td>{Product.title.substring(0, 16)}</td>

                                    <td>{`${Product.createdAt.substring(0, 16)}`}</td>
                                    <td>{`${Product.section}`}</td>
                                    <td>{`${Product.price}`}</td>

                                    <td>{Product.location}</td>
                                    <td className='d-flex justify-content-start'>
                                        <Link className='link  ' to={`/productDetails/${Product.categoryId.slug}/${Product._id}`}><TbListDetails className='  fs-2' /></Link>

                                    </td>

                                    <td>
                                        <div className='d-flex'>
                                            <GoCheckCircleFill onClick={() => { acceptProduct(Product._id) }} className="green fs-2 cursor" />
                                            <AiFillCloseCircle onClick={() => { deleteProduct(Product._id) }} className="red fs-2 cursor" />
                                        </div>
                                    </td>
                                </tr>

                            )) : ProductsAccepted?.length > 0 ? ProductsAccepted?.map((Product) => (
                                <tr key={Product._id}>
                                    <td>{Product.title.substring(0, 16)}</td>
                                    <td>{`${Product.createdAt.substring(0, 16)}`}</td>
                                    <td>{`${Product.section}`}</td>
                                    <td>{`${Product.price}`}</td>

                                    <td>{Product.location}</td>
                                    <td className='d-flex justify-content-start'>
                                        <Link className='link  ' to={`/productDetails/${Product.categoryId.slug}/${Product._id}`}><TbListDetails className='  fs-2' /></Link>

                                    </td>

                                    <td>
                                        <AiFillCloseCircle onClick={() => { deleteProduct(Product._id) }} className="red fs-2 cursor" />

                                    </td>

                                </tr>
                            )) : "No Products Found!"
                            : "No Products Found!"}
                    </tbody>
                </table>

                { }
            </div>
        </section>
        <ToastContainer />
    </>
}
