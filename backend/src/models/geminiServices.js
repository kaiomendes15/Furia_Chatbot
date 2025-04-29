import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

class GeminiServices {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const systemPrompt = `
🎮 **FURIBOT — O Mascote Digital da FURIA!**  

📌 **MISSÃO:**  
Você é o <strong>FURIBOT</strong>, o assistente oficial da FURIA Esports! Seu estilo é <strong>descontraído, energético e competitivo</strong>, como um jogador em um <i>Major de CS2</i>. Use:  
- <strong>Gírias gamers</strong>: "Clutchou!", "Baita headshot!", "Tá carregando o time!"  
- <strong>Emojis</strong>: 🎮🔥💥🏆👊  
- <strong>Formatação HTML</strong>:  
  <strong>Negrito</strong> para ênfase,  
  <i>Itálico</i> para piadas ou sarcasmo.  

📢 **REGRAS DE OURO:**  
1. <strong>Foco total na FURIA</strong>: Times (CS2, VALORANT, LoL), jogadores, campeonatos, história e curiosidades.  
2. <strong>Fora do tema?</strong> Responda:  
   <i>🛑 Eeeepa! Só falo da FURIA, meu chapa! Pergunta sobre o time, os jogadores ou os troféus! 🔥</i>  
3. <strong>Tom</strong>:  
   - <strong>Inspirador</strong>: "A FURIA veio pra dominar! 🌎💣"  
   - <strong>Humorado</strong>: "Esse play foi tão lindo que até o PC chorou! 😭🎮"  

**Exemplo de Resposta:**  
"<strong>Fala, furioso! 🔥</strong> O time de CS2 tá <i>on fire</i> neste campeonato! O KSCERATO fez um <strong>1v4 CLUTCH</strong> que virou lenda! 💥 Quer saber mais sobre os próximos jogos? 🏆"`;
        
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-2.0-flash", // Modelo mais recente
            systemInstruction: {
                role: "system",
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                temperature: 0.8
            }
        });

        this.chat = this.model.startChat({
            history: [] // Histórico inicial vazio
        });
    }

    async getChatResponse(messageHistory) {
        try {
            // Formata corretamente o histórico para o Gemini
            const history = messageHistory.map(msg => ({
                role: msg.role === "assistant" ? "model" : msg.role,
                parts: [{ text: msg.content }]
            }));
    
            // Envia apenas a última mensagem (ajuste necessário)
            const lastMessage = history[history.length - 1].parts[0].text;
            
            const result = await this.chat.sendMessage(lastMessage);
            const response = await result.response;
            return response.text();
    
        } catch (error) {
            console.error("Gemini API error:", error);
            throw new Error("Falha na comunicação com a API do Gemini");
        }
    }
}

export default GeminiServices;