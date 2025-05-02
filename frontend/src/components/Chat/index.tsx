import { useEffect, useState, useRef } from "react"
import "./style.css"
import { setChatBackgroundColorScheme, setChatTextColorScheme } from "./repository/renderLogic"
// import axios from "axios"
import InputWithButton from "../InputWithButton"
import { useDarkMode } from "@/contexts/DarkModeContext"
import axios from "axios"
import TypingIndicator from "../TypingIndicator"


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
        const response = await axios.post("http://localhost:3000/api/chat", {
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
        position: 'relative'
      }}>
        {/* Messages area with scroll */}
        <div
          className={darkMode ? "chat-messages-dark" : "chat-messages-white"}
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
              <p dangerouslySetInnerHTML={{ __html: msg.content}}></p>
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