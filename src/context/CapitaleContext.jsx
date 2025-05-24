import React, { createContext, useContext, useEffect, useState } from "react";
import {
    getCapitale,
    resetCapitale,
    resetCapitaleCompleto,
} from "../utils/capitaleMovimentoUtils";

// 🔁 Creo il context
const CapitaleContext = createContext();

// 📦 Provider
export const CapitaleProvider = ({ children }) => {
    const [capitale, setCapitale] = useState(null);
    const [loadingCapitale, setLoadingCapitale] = useState(true);

    // 🔄 Recupero capitale all'avvio
    const fetchCapitale = async () => {
        try {
            const data = await getCapitale();
            setCapitale(data);
        } catch (error) {
            console.error("Errore nel fetch del capitale:", error);
        } finally {
            setLoadingCapitale(false);
        }
    };

    useEffect(() => {
        fetchCapitale();
    }, []);

    // 🔁 Reset parziale
    const handleReset = async () => {
        try {
            const data = await resetCapitale();
            setCapitale(data);
        } catch (error) {
            console.error("Errore nel reset parziale:", error);
        }
    };

    // 💥 Reset completo
    const handleResetCompleto = async () => {
        try {
            const data = await resetCapitaleCompleto();
            setCapitale(data);
        } catch (error) {
            console.error("Errore nel reset completo:", error);
        }
    };

    return (
        <CapitaleContext.Provider
            value={{
                capitale,
                setCapitale,
                loadingCapitale,
                fetchCapitale,
                resetCapitale: handleReset,
                resetCapitaleCompleto: handleResetCompleto,
            }}
        >
            {children}
        </CapitaleContext.Provider>
    );
};

// 🎯 Custom hook
export const useCapitale = () => {
    const context = useContext(CapitaleContext);
    if (!context) {
        throw new Error("useCapitale deve essere usato dentro <CapitaleProvider>");
    }
    return context;
};
