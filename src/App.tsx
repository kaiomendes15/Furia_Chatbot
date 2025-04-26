
import InputWithButton from './components/InputWithButton'
import Container from './components/Container'
import './App.css'
import { useDarkMode } from './contexts/DarkModeContext'
import Header from './components/Header'

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5", // Cinza escuro suave / Off-white
    color: darkMode ? "#e0e0e0" : "#333333" // Cinza claro / Cinza escuro
  };

  return (
    <Container style={theme}>
      <Header onChange={toggleDarkMode}/>
      <InputWithButton/>
    </Container>
  );
}

export default App
