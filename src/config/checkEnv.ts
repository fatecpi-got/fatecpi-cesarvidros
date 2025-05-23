import dotenv from "dotenv";

export const checkEnv = () => {
    dotenv.config({ path: __dirname + "/../../.env" });

    const requiredEnv = [
        "DB_USER",
        "DB_HOST",
        "DB_NAME",
        "DB_PASSWORD",
        "DB_PORT"
    ];

    const missingEnv = requiredEnv.filter((envVar) => !process.env[envVar]);

    if (missingEnv.length > 0) {
        throw new Error(`🚨 Erro: As seguintes variáveis de ambiente não estão definidas: ${missingEnv.join(", ")}`);
    }

    console.log("✅ Todas as variáveis de ambiente foram carregadas corretamente.");

}