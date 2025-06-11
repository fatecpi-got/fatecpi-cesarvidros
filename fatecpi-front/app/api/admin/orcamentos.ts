export async function getAllServicos(url: string): Promise<Response> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error("Erro ao listar todos os orcamentos")
    }

    return response;
}