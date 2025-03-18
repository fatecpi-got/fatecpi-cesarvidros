import { Pool } from "pg";
import dotenv from 'dotenv';
import "../config/checkEnv"; 


dotenv.config({ path: './config/.env' })

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number( process.env.POSTGRES_PORT ),
});

const connect_to_database = async (): Promise<void> => {
    let attemp: number = 0;
    const max_attempts: number = 3

    while (attemp < max_attempts) {
        try {
            await pool.query("SET client_encoding = 'UTF8';");
            const client = await pool.connect();
            client.release();

            console.log("Connected to database");
            return;
        } catch (error) {
            attemp++
            console.error('error to connected to database', error);

            if (attemp < max_attempts) {
                console.log(`Retrying connection to database... (${attemp}/ ${max_attempts})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                console.error('Failed to connect to database after 3 attempts');
                process.exit(1);
            }
        }
    }
}

export { connect_to_database, pool };