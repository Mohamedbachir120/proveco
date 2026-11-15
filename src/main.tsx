import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Works both at the domain root and under the GitHub Pages sub-path (/proveco/).
// The single-file build rewrites BASE_URL to "./", so the sub-path is detected from the URL.
const GH_PAGES_BASE = '/proveco'
const basename = window.location.pathname.startsWith(GH_PAGES_BASE) ? GH_PAGES_BASE : undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
