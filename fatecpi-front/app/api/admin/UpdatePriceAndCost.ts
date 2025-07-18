export async function UpdatePriceCost(
    id: number,
    preco: number,
    custo: number,
    orcamento_id: number,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, preco, custo, orcamento_id })
    })

    if (!response.ok) {
        throw new Error("Erro ao enviar orçamento!")
    }

    return response;
}