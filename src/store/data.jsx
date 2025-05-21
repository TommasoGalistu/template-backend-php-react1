import { createContext, useState } from "react";

export const ContextData = createContext(); 

export const ContextProvider = ({ children }) => {
    const [isLoggin, setIsLoggin] = useState(false); 
    const [loading, setLoading] = useState(false);

    // Funzioni per gestire il caricamento
    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    return (
        <ContextData.Provider value={{ isLoggin, setIsLoggin, showLoading, hideLoading, loading }}>
            {children}
        </ContextData.Provider>
    );
};
