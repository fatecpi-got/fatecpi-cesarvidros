import React, {createContext, ReactNode, useContext, useState} from "react";
import { Spin } from "antd";
import '../../styles/Loading/Loading.css'

interface LoadingContextType  {
    loading: boolean;
    startLoading: () => void
    stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}

export const LoadingProvider : React.FC<{children: ReactNode}> = ({children}) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{loading, startLoading: () => setLoading(true), stopLoading: () => setLoading(false)}}>
            {loading && (
                <div className="loading-container">
                    <Spin size="large" fullscreen/>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    )
}