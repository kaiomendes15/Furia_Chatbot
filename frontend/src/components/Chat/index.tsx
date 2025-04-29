import { useEffect, useState, useRef } from "react"
import "./style.css"
import { setChatBackgroundColorScheme, setChatTextColorScheme } from "./repository/renderLogic"
// import axios from "axios"
import InputWithButton from "../InputWithButton"
import { useDarkMode } from "@/contexts/DarkModeContext"
import axios from "axios"


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
    const [messages, setMessages] = useState<Message[]>([]);

    // const fetchIntents = async () => {

    //     try {
    //         const response = await fetch('/intents.json')
    //         if (!response.ok) { // Verifica se a resposta HTTP é bem-sucedida (200-299)
    //             throw new Error(`Erro HTTP: ${response.status}`);
    //         }

    //         const intentsData: IntentsData = await response.json()


    //         setIntents(intentsData.intents)

    //     } catch (error) {
    //         console.log("Falha ao carregar intenções:", error)
    //         setIntents([])
    //     }
    // }

    // const getBotResponse = (userMessage: Message): string => {
    //     const message = userMessage.content

    //     // encontrar a intent que corresponde à mensagem
    //     const matchedIntent = intents.find(intent => 
    //         intent.patterns.some(pattern => 
    //             message.includes(pattern.toLowerCase())
    //         )
    //     );

    //     if (matchedIntent && matchedIntent.responses.length > 0) {
    //         const randomIndex = Math.floor(Math.random() * matchedIntent.responses.length)

    //         return matchedIntent.responses[randomIndex]
    //     }

    //     // const fallback = intents.find(intent => 
    //     //     intent.tag === "fallback"
    //     // )
    //     // 3. Fallback garantido (com verificação)
    //     const fallback = intents.find(intent => intent.tag === "fallback");
    //     if (!fallback?.responses?.length) {
    //         return "Desculpe, não entendi. Poderia reformular?";
    //     }

    //     const randomIndex = Math.floor(Math.random() * fallback.responses.length)

    //     return fallback.responses[randomIndex]
        
        
    // }
  
    
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
  
      const userMessage: Message = {
        role: "user",
        content: userInput.trim().toLowerCase()
      };

      try {
        const response = await axios.post("http://localhost:3000/api/chat", {
          messageHistory: [...messages, userMessage] // corpo da req
        });

        console.log(response.data)

        const botMessage: Message = {
          role: "model",
          content: response.data.reply
        };

        setMessages(prev => [...prev, userMessage, botMessage]);
        setUserInput('');

      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    };
  
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}>
        {/* Messages area with scroll */}
        <div 
          style={{ 
            ...style,
            flex: 1,
            overflowY: 'auto',
            padding: '0 1rem',
            paddingTop: '60px', // Space for header
            paddingBottom: '80px' // Space for input
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
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
  
        {/* Fixed input at bottom */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: style.backgroundColor,
          padding: '1rem',
          borderTop: `1px solid ${style.color}20` // Subtle border
        }}>
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