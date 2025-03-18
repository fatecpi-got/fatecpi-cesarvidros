const requiredEnv = [
    "POSTGRES_USER",
    "POSTGRES_HOST",
    "POSTGRES_DB",
    "POSTGRES_PASSWORD",
    "POSTGRES_PORT"
];

requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`🚨 Erro: A variável de ambiente ${envVar} não está definida!`);
        process.exit(1);
    }
});
