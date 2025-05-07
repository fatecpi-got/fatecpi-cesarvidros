import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: './config/.env' })

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});

const connect_to_database = async (): Promise<void> => {
    let attempt = 0;
    const max_attempts = 3;

    while (attempt < max_attempts) {
        try {
            await pool.query("SET client_encoding = 'UTF8';");
            const client = await pool.connect();
            client.release();

            console.log("✅ Conectado ao banco de dados com sucesso!");
            return;
        } catch (error) {
            attempt++;
            console.error(`❌ Erro ao conectar ao banco de dados (tentativa ${attempt}/${max_attempts}):`, error);

            if (attempt < max_attempts) {
                console.log("🔄 Tentando novamente em 1 segundo...");
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                throw new Error("❌ Falha ao conectar ao banco de dados após 3 tentativas.");
            }
        }
    }
};

export { connect_to_database, pool };