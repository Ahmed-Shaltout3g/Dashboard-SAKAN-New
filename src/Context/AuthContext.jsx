import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let authContext = createContext(null);
export function AuthContextProvider(props) {
    let [userData, setData] = useState(null);
    let token = localStorage.getItem("user");

    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            let decode = jwtDecode(token);
            console.log(decode);
            setData(decode);
            console.log(userData);
        }
    }, [token]);


    return <authContext.Provider value={{ userData, setData }}>
        {props.children}
    </authContext.Provider>
}