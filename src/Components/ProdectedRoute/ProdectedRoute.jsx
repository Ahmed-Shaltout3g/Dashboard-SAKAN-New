import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import Login from '../Login/Login'


export default function ProdectedRoute({ children }) {
    let { userData, setData } = useContext(authContext)
    if (userData == null) {
        return <Login />
    }
    else {
        return children;

    }


}
