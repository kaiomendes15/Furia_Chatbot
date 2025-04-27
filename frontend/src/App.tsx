
import Container from './components/Container'
import './App.css'
import { useDarkMode } from './contexts/DarkModeContext'
import Header from './components/Header'
import Chat from './components/Chat'

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
    color: darkMode ? "#e0e0e0" : "#333333"
  };

  return (
    <Container style={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh' /* Garante altura total em mobile */
      }}>
        <Header onChange={toggleDarkMode} backgroundColor={theme.backgroundColor}/>
        <Chat style={theme} />
      </div>
    </Container>
  );
}

export default App
