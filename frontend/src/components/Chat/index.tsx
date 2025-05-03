import { useEffect, useState, useRef } from "react"
import "./style.css"
import { setChatBackgroundColorScheme, setChatTextColorScheme } from "./repository/renderLogic"
// import axios from "axios"
import InputWithButton from "../InputWithButton"
import { useDarkMode } from "@/contexts/DarkModeContext"
import axios from "axios"
import axiosRetry from "axios-retry"
import TypingIndicator from "../TypingIndicator"

// configura o retry do axios
// qualquer requisiÇão que falhar com status >= 500 ou ECONNABORTED vai ser re-enviada 3 vezes, com delay de 1 segundo entre cada tentativa
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    const status = error?.response?.status;
    return (status !== undefined && status >= 500) || error.code === "ECONNABORTED";
  }
});



type ChatProps = {
    style: {
        backgroundColor: string,
        color: string
    }
}

const Chat = ({ style }: ChatProps) => {
    // Refs and state
    const { darkMode } = useDarkMode();
    const chatEndRef = useRef<HTMLDivElement>(null);
    // const [ intents, setIntents ] = useState<Intent[]>([])
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
  
    
    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    // useEffect(() => {
    //     fetchIntents()
    // }, [])
  
    // Message handling
    const handleSend = async () => {
      if (!userInput.trim()) return;

      try {
        const userMessage: Message = {
          role: "user",
          content: userInput.trim().toLowerCase()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setUserInput('');
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
          messageHistory: [...messages, userMessage] // corpo da req
        });
        setIsTyping(false);

        // console.log(response.data)

        const botMessage: Message = {
          role: "model",
          content: response.data.reply
        };
        setMessages(prev => [...prev, botMessage]);

      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    };
  
    return (
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}>
        {/* { Área de mensagens } */}
        <div
          className={darkMode ? "chat-messages-dark" : "chat-messages-white"}
          style={{ 
            ...style,
            flex: 1,
            overflowY: 'auto',
            padding: '0 1rem',
            paddingTop: '100px', // antes era 60px
            paddingBottom: '30px' // mantém o espaço inferior
          }}
        >
          {messages.map((msg, idx) => (
            <div
              
              key={idx}
              className="mensage-box"
              data-role={msg.role}
              style={{
                background: setChatBackgroundColorScheme(darkMode, msg.role),
                color: setChatTextColorScheme(darkMode, msg.role),
                marginBottom: "8px"
              }}
            >
              <strong className="mensage-content">
                {msg.role === 'user' ? 'Você' : 'FURIBOT'}
              </strong>
              <p dangerouslySetInnerHTML={{ __html: msg.content}}></p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
  
        {/* input fixo na parte inferior da tela */}
        <div className={darkMode ? "div-input-black" : "div-input-white"} style={{
          position: 'sticky',
          bottom: 0,
          padding: '1rem',
          borderTop: `1px solid ${style.color}20` // borda
        }}>
          {isTyping && (
            <div className="message bot">
              <TypingIndicator />
            </div>
          )}
          <InputWithButton 
            onClick={handleSend} 
            onChange={(e) => setUserInput(e.target.value)} 
            value={userInput}
          />
        </div>
      </div>
    );
  };
export default Chat