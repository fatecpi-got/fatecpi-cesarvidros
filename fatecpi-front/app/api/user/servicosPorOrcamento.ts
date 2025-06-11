export async function getServicosByOrcamentoId(
    orcamento_id: number,
    url: string
) : Promise<Response> {
    const response = await fetch(url + orcamento_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    return response;
}