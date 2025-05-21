import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import LoadingScreen from "./LoadingScreen.jsx";
import useAuth from "../hookCustom/useAuth";
import { useContext, useEffect, useState } from "react";
import { ContextData } from "../store/data.jsx";


function Root(){
    const { loading } = useContext(ContextData);
    // const isAuthenticated = useAuth()
    // const [isLoggedProps, setIsLoggedProps] = useState(isAuthenticated)
    // useEffect(() =>{
    //     setIsLoggedProps(prevProps => isAuthenticated)
    // }, [isAuthenticated])

    return <>
        {loading && <LoadingScreen />}
        <Header  />
        <Outlet />
    </>
}

export default Root;