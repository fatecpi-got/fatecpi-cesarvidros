import app from "./app";
require('dotenv').config();
import { connect_to_database } from "./database/database";

const port = process.env.PORT || 3000;

connect_to_database().then(() => {
    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
})
