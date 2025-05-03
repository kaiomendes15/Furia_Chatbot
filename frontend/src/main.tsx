import { Provider } from '@/components/ui/provider.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkModeProvider } from './contexts/DarkModeContext.tsx'


// main.tsx
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
setVH(); // Chamada inicial



createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <DarkModeProvider>
      <Provider>
        <App /> 
      </Provider>
    </DarkModeProvider>
  </StrictMode>,
)
