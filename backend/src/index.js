import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// rotas
import chatRoutes from './routes/chatRoutes.js';

// middleware para processar o corpo das requisições
app.use(express.json());

// aceitar requisições de qualquer origem
// precisa usar o cors enquanto estiver desenvolvendo localmente
app.use(cors());


app.use(chatRoutes);

// Exporta o app para que o Vercel use
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});