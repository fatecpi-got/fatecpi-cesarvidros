

export async function cadastrarOrcamento(
    data: unknown,
    url: string
) : Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
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