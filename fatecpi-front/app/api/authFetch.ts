export async function createUser(
    nome: string,
    email: string,
    senha: string,
    tipo_acesso: "user",
    data_nascimento: string,
    numero_telefone: string,
    rua: string,
    cidade: string,
    estado: string,
    numero_casa: string,
    cep: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, tipo_acesso, data_nascimento, numero_telefone, rua, cidade, estado, numero_casa, cep }),
    });
    if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
    }

    return response;
}

export async function loginUser(
    email: string,
    senha: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
    });

    console.log(url)

    if (!response.ok) {
        throw new Error("Email ou senha inválidos");
    }

    return response;
}
