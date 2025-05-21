export interface AuthSignUp {
    nome: string;
    email: string;
    senha: string;
    tipo_acesso: "user";
    data_nascimento: string;
    rua: string;
    estado: string;
    cidade: string;
    numero_casa: string;
    numero_telefone: string;
}

export interface AuthSignIn {
    email: string;
    senha: string;
}