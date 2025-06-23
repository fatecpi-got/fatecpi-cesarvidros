export async function GetPontosPositivos(
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

export async function GetPontosNegativos(
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

export async function CreateFeedback(
    url: string,
    pedido_id: number,
    entrega: number,
    atendimento: number,
    preco: number,
    pontos_positivos_id: number[],
    pontos_negativos_id: number[]
): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({pedido_id, entrega, atendimento, preco, pontos_positivos_id, pontos_negativos_id})
    });
    return response;
}