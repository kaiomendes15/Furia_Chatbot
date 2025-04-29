import GeminiServices from "../models/geminiServices.js";



class ChatController {

    static async handleChat(req, res, next) {

        try {
            const { messageHistory } = req.body;

            if (!messageHistory) {
                return res.status(400).json({ error: "Histórico inválido" });
            }

            const service = new GeminiServices()
        
            const reply = await service.getChatResponse(messageHistory); // o fron vai precisar por um response.data.reply
            res.status(200).json({ reply });
        } catch (error) {
            console.error("Controller error:", error);
            res.status(500).json({ error: error.message});
        }

    }
}

export default ChatController