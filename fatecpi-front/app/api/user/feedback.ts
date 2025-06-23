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