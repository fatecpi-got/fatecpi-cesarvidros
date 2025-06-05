export async function cadastrarOrcamento(
    cor_vidro: string,
    largura: number,
    altura: number,
    fechadura: string,
    cor_aluminio: string,
    puxador: string,
    sub_produto_id: number,
    usuario_id: number,
    url: string
) : Promise<any> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, usuario_id})
    })

    if (!response.ok) {
        throw new Error("Erro ao enviar orçamento!")
    }

    return response;
}