import { useState, useEffect } from "react";
import { useLoading } from "../component/Loading/Loading";
import { aw } from "framer-motion/dist/types.d-6pKw1mTI";

interface Servico {
    id_servico: number;
    servico_nome: string;
    imagem_url: string;
    descricao: string;
    categoria_nome: string;
    sub_categoria_nome: string;
}

export const useServico = () => {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchServicos = async () => {
            const cachedData = sessionStorage.getItem("servicos");

            if (cachedData) {
                const parsedData = await JSON.parse(cachedData);
                setServicos(parsedData);
                return;
            }

            startLoading();
            try {
                const response = await fetch('https://cesarvidros.onrender.com/api/servicos/get-all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: "force-cache"
                })

                const response_json = await response.json()

                if (response_json.message === 'sucesso') {
                    sessionStorage.setItem("servicos", JSON.stringify(response_json.data));
                    setServicos(response_json.data)
                } else {
                    console.log(response_json.message, response_json.data)
                }
            } catch (error) {
                console.error(error);
            } finally {
                stopLoading();
            }
        }

        if (servicos.length === 0) {
            fetchServicos();
        }
    }, [])

    return servicos;
}