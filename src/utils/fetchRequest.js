import { useContext } from "react";
import { ContextData } from "../store/data";

const useFetchWithLoading = () => {
    const { showLoading, hideLoading, setIsLoggin } = useContext(ContextData);

    const fetchData = async (url, options = {}) => {
        
        try {
            showLoading(); 
            const response = await fetch(url, {
                ...options,
                credentials: "include", // Mantiene la sessione
            });

            if (!response.ok) {
                const errData = await response.json();
                console.log("Errore backend:", errData);
                throw new Error(errData.error || 'Errore sconosciuto');
            }
            setIsLoggin(true)
            return response.json();


        } catch (error) {
            setIsLoggin(false)
            
            return  {error: error.message};


        }finally {
            setTimeout(() =>{
                hideLoading(); 
            }, 1000)
        }
    };

    return fetchData;
};

export default useFetchWithLoading;