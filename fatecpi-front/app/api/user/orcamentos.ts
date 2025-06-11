export async function GetOrcamentosByUser(
    usuario_id: number,
    url: string
): Promise<Response> {
    const response = await fetch(url + usuario_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}