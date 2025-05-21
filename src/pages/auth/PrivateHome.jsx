import { useNavigate } from "react-router-dom";
import useAuth from "../../hookCustom/useAuth";
import { use, useContext, useState } from "react";
import {  ContextData } from '../../store/data'
import styles from './PrivateHome.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import useFetchWithLoading from "../../utils/fetchRequest";

function PrivateHome(){
    // const [showLoading, hideLoading] = useContext(ContextData)
    const [isSentCount, setIsSentCount] = useState(0)
    const isAuthenticated = useAuth();
    const fetchData = useFetchWithLoading();
    const navigate = useNavigate();

    if(isAuthenticated === null){
        return <p>Caricamento in corso</p>
    }

    if(!isAuthenticated){
        navigate("/login")
    }

    // async function addElementList(event){
    //     event.preventDefault()
        
    //     let form = new FormData(event.target);
    //     let data = Object.fromEntries(form.entries())
        
        
    //         const response = await fetchData('http://localhost:3000/user/add-todo', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: "include",
    //             body: JSON.stringify(data)
    //         })
    //         console.log(response)
    //         if(response){

    //             // const result = await response.json();
    //             console.log("Elemento inserito in DB ", response.message)
    //             setIsSentCount(prevCount => prevCount + 1);
    //         }else{
    //             console.log('errore nel caricamento pagina privata')
    //         }
            
        
    // }
    

    return (
        <>
            <p>Pagina caricata correttamente, sei loggato con token vaido</p>
        </>
    )
}

export default PrivateHome;