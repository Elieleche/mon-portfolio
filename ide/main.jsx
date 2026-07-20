import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import IdePage from '../src/ide/IdePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IdePage />
  </StrictMode>,
)
