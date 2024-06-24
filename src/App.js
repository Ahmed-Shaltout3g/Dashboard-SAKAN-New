import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Message from "./Components/Message/Message";
import AddAdmin from "./Components/AddAdmin/AddAdmin";
import AddUser from "./Components/AddUser/AddUser";
import AddAdv from "./Components/AddAdv/AddAdv";
import ProdectedRoute from "./Components/ProdectedRoute/ProdectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import FieldAdv from "./Components/FieldAdv/FieldAdv";
import AddMessage from "./Components/AddMessage/AddMessage";
import Analyze from "./Components/Analyze/Analyze";
import { useContext, useEffect } from "react";
import { authContext } from "./Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AddCategory from "./Components/AddCategory/AddCategory";

function App() {
  let { userData, setData } = useContext(authContext);

  function DtataToken() {
    let tokenDecode = localStorage.getItem("userData");
    let dataDecode = jwtDecode(tokenDecode);
    setData(dataDecode);
  }
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      DtataToken();
    }
  }, []);

  const router = createHashRouter([
    {
      path: "/",

      element: <Layout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/home",
          element: (
            <ProdectedRoute>
              <Home />
            </ProdectedRoute>
          ),
        },
        {
          path: "/addAdmin",
          element: (
            <ProdectedRoute setData={DtataToken} userData={userData}>
              <AddAdmin />
            </ProdectedRoute>
          ),
        },

        {
          path: "/addUser",
          element: (
            <ProdectedRoute>
              <AddUser />
            </ProdectedRoute>
          ),
        },
        {
          path: "/addAdv",
          element: (
            <ProdectedRoute>
              <AddAdv />
            </ProdectedRoute>
          ),
        },
        {
          path: "/message",
          element: (
            <ProdectedRoute>
              <Message />
            </ProdectedRoute>
          ),
        },
        {
          path: "/addMessage",
          element: (
            <ProdectedRoute>
              <AddMessage />
            </ProdectedRoute>
          ),
        },
        {
          path: "/analyze",
          element: (
            <ProdectedRoute>
              <Analyze />
            </ProdectedRoute>
          ),
        },
        {
          path: "/productDetails/:name/:id",
          element: (
            <ProdectedRoute>
              <ProductDetails />
            </ProdectedRoute>
          ),
        },
        {
          path: "/fieldAdv/:categoryId",
          element: (
            <ProdectedRoute>
              <FieldAdv />
            </ProdectedRoute>
          ),
        },
        {
          path: "/AddCategory",
          element: (
            <ProdectedRoute>
              <AddCategory />
            </ProdectedRoute>
          ),
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
