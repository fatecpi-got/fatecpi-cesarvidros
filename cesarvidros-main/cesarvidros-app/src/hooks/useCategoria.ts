import { useEffect, useState } from "react";
import { useLoading } from "../component/Loading/Loading";

interface Categoria {
    id_categoria: number;
    nome: string;
    imagem_url: string;
    descricao: string;
}

export const useCategoria = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchCategorias = async () => {
            // Check if data is already cached in sessionStorage
            const cachedData = sessionStorage.getItem("categorias");
            if (cachedData) {
                // Parse and use the cached data
                const parsedData = JSON.parse(cachedData);
                setCategorias(parsedData);
                return;
            }

            startLoading();
            try {
                const response = await fetch('https://cesarvidros.onrender.com/api/categorias/get-all', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: "force-cache" // Forces browser caching
                });

                const response_json = await response.json();

                if (response_json.message === 'sucesso') {
                    // Cache the fetched data in sessionStorage
                    sessionStorage.setItem("categorias", JSON.stringify(response_json.data));
                    setCategorias(response_json.data);
                } else {
                    console.log(response_json.message, response_json.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                stopLoading();
            }
        };

        fetchCategorias();
    }, [startLoading, stopLoading]);

    return categorias;
};