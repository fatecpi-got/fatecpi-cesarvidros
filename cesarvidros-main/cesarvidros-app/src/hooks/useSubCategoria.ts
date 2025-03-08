import { useState, useEffect } from "react";
import { useLoading } from "../component/Loading/Loading";

interface SubCategoria {
    id_sub: number;
    nome: string;
}
export const useSubCategoria = () => {
    const [categorias, setCategorias] = useState<SubCategoria[]>([]);
    const {startLoading, stopLoading} = useLoading();

    useEffect(() => {
        const fetchCategorias = async () => {
            startLoading();
            try {
                const response = await fetch('https://cesarvidros.onrender.com/api/sub-categorias/get-all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const response_json = await response.json()

                if (response_json.message === 'sucesso') {
                    setCategorias(response_json.data)
                } else {
                    console.log(response_json.message, response_json.data)
                }
            } catch (error) {
                console.error(error);
            } finally {
                stopLoading();
            }
        }

        fetchCategorias()
    }, []);

    return categorias;
}