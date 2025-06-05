export async function fetchSubProdutos(url: string): Promise<Response> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar subprodutos");
    }

    return response;
}