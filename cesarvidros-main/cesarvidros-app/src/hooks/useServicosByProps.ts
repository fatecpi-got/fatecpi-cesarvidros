interface Servico {
    id_servico: number;
    servico_nome: string;
    imagem_url: string;
    descricao: string;
    categoria_nome: string;
    sub_categoria_nome: string;
}

export const useServicosByProps = async (
    url: string,
    setServicos: React.Dispatch<React.SetStateAction<Servico[]>>
  ) => {
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response_json = await response.json();
  
      if (response_json.status === "success") {
        setServicos(response_json.data);
      } else {
        console.error("Error fetching services:", response_json.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };