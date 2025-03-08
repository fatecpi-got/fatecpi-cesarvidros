import { useState, useEffect } from "react";
import { useLoading } from "../component/Loading/Loading";

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
    const {startLoading, stopLoading} = useLoading();

    useEffect(() => {
        const fetchServicos = async () => {
            startLoading();
            try {
                const response = await fetch('https://cesarvidros.onrender.com/api/servicos/get-all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const response_json = await response.json()

                if (response_json.message === 'sucesso') {
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