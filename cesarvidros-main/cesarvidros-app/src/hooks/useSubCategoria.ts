import { useState, useEffect } from "react";
import { useLoading } from "../component/Loading/Loading";

interface SubCategoria {
    id_sub: number;
    nome: string;
}

export const useSubCategoria = () => {
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchSubCategorias = async () => {
            // Check if data is already cached in sessionStorage
            const cachedData = sessionStorage.getItem("subCategorias");
            if (cachedData) {
                // Parse and use the cached data
                const parsedData = JSON.parse(cachedData);
                setSubCategorias(parsedData);
                return;
            }

            startLoading();
            try {
                const response = await fetch('https://cesarvidros.onrender.com/api/sub-categorias/get-all', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: "force-cache" // Forces browser caching
                });

                const response_json = await response.json();

                if (response_json.message === 'sucesso') {
                    // Cache the fetched data in sessionStorage
                    sessionStorage.setItem("subCategorias", JSON.stringify(response_json.data));
                    setSubCategorias(response_json.data);
                } else {
                    console.log(response_json.message, response_json.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                stopLoading();
            }
        };

        fetchSubCategorias();
    }, [startLoading, stopLoading]);

    return subCategorias;
};