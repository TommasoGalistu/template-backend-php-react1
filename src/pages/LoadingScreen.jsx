import { useContext } from "react";
import { ContextData } from "../store/data";
import styles from "./LoadingScreen.module.css"; // Importa il CSS per lo stile

const LoadingScreen = () => {
    // const { loading } = useContext(ContextData);

    // if (!loading) return null; // Se non è in caricamento, non mostra nulla

    return (
        <div className={styles.contLoader}>
            <div className={styles.loader}></div>

        </div>
    );
};

export default LoadingScreen;
