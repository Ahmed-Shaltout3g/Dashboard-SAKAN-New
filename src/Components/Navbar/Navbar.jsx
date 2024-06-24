import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsHouseAddFill } from "react-icons/bs";
import { authContext } from '../../Context/AuthContext';
import { RiUserAddFill } from "react-icons/ri";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";

export default function Navbar() {
    let { userData, setData } = useContext(authContext)
    const [show, setShow] = useState(false);
    function logOut() {
        localStorage.removeItem('user')
        setData(null)
        return <Navigate to="/" />
    }
    return <>
        {userData != null ? <nav
            className={show ? "show sidebar" : "sidebar"}

        >
            <div className="links">
                <Link to="/home">
                    <TiHome onClick={() => setShow(!show)} />
                </Link>
                <Link to="/AddUser">
                    <RiUserAddFill onClick={() => setShow(!show)} />
                </Link>
                <Link to="/AddCategory">
                    <TbCategoryPlus onClick={() => setShow(!show)} />

                </Link>
                <Link to="/AddAdv">
                    <BsHouseAddFill onClick={() => setShow(!show)} />
                </Link>
                <Link to="/AddAdmin">
                    <IoPersonAddSharp onClick={() => setShow(!show)} />
                </Link>
                <Link to="/message">
                    <AiFillMessage onClick={() => setShow(!show)} />
                </Link>
                <Link to="/addMessage">
                    <BiSolidMessageRoundedAdd onClick={() => setShow(!show)} />

                </Link>
                <Link to="/analyze">
                    <IoMdAnalytics onClick={() => setShow(!show)} />

                </Link>

                <RiLogoutBoxFill onClick={logOut} />


            </div>
        </nav> : ""}
        <div
            className="wrapper"

        >
            <GiHamburgerMenu className="hamburger cursor" onClick={() => setShow(!show)} />
        </div>


    </>
}
