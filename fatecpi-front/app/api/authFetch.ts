export async function createUser(
    nome: string,
    email: string,
    senha: string,
    tipo_acesso: "user",
    data_nascimento: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, tipo_acesso, data_nascimento }),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response;
}

async function deleteUser(
    userId: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response;
}

export async function createAdress(
    usuario_id: string,
    rua: string,
    estado: string,
    cidade: string,
    numero: string,
    url: string
): Promise<Response> {
    console.log("rua", rua);
    console.log("estado", estado);
    console.log("cidade", cidade);
    console.log("numero_casa", numero);
    console.log("url", url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id, rua, estado, cidade, numero }),
    });
    if (!response.ok) {
        const userId = usuario_id;
        deleteUser(userId, "https://fatecpi-cesarvidros-1.onrender.com/auth/cancelar");
        throw new Error("Network response was not ok");
    }


    return response;
}

export async function createPhone(
    usuario_id: string,
    numero: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id, numero }),
    });
    if (!response.ok) {
        const userId = usuario_id;
        deleteUser(userId, "https://fatecpi-cesarvidros-1.onrender.com/auth/cancelar");
        throw new Error("Network response was not ok");
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
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response;
}
