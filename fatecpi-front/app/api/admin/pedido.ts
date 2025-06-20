export async function getAllPedidos(url: string): Promise<Response> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao listar todos os pedidos");
    }

    return response;
}

export async function updatePedidoEstado(url: string, pedido_id: number, status: string): Promise<Response> {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ pedido_id, status })
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar o pedido");
    }

    return response;
}

export async function getPedidoById(url: string, pedido_id: number): Promise<Response> {
    const response = await fetch(`${url}/${pedido_id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar o pedido");
    }

    return response;
}