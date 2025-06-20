export async function updateServicosEstados(
    data: {servico_id: number, orcamento_id: number, novo_status: string}[],
    url: string
) : Promise<Response> {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Erro ao enviar orçamento!")
    }

    return response;
}