import { Pool } from "pg";
import bcrypt from "bcryptjs";

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

async function criptografarSenhas() {
    const usuarios = await pool.query("SELECT id, senha FROM USUARIO");
    for (const usuario of usuarios.rows) {
        // Pule se já estiver criptografada (opcional, mas recomendado)
        if (usuario.senha.startsWith("$2a$") || usuario.senha.startsWith("$2b$")) continue;

        const hash = await bcrypt.hash(usuario.senha, 10);
        await pool.query("UPDATE USUARIO SET senha = $1 WHERE id = $2", [hash, usuario.id]);
        console.log(`Senha do usuário ${usuario.id} criptografada.`);
    }
    console.log("Todas as senhas foram criptografadas!");
    await pool.end();
}

criptografarSenhas().catch(console.error);