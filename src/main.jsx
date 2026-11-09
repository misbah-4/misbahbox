import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Agentation } from 'agentation'
import '@fontsource-variable/inter/index.css'
import '@fontsource/momo-signature/400.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </StrictMode>,
)
