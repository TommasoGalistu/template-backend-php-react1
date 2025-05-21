import { useState, useEffect, use } from "react";
import {ContextData} from "../store/data";

// hook per vedere se l'utente ha il token
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = caricamento
    const {isLoggin, setIsLoggin} = use(ContextData)

    useEffect (() =>{
        const checkAuth = async () =>{
            try{
              const response = await fetch('http://localhost:3000/check-token', {
                method: "GET",
                credentials: "include"
              })
              
              if (!response.ok) {
                const errData = await response.json();
                console.log("Errore backend:", errData);
                throw new Error(errData.error || 'Errore sconosciuto');
              }
    
              const data = await response.json()
              setIsLoggin(data.message)
              setIsAuthenticated(true)
              console.log(data.message)
              
            }catch(error){
              console.log(error.message)
              setIsAuthenticated(false)
              // return  {error: error.message};
            }
        }
        checkAuth();
      },[])

    return isAuthenticated;
};

export default useAuth;
