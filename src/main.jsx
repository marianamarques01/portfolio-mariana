import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignPreview from './DesignPreview.jsx'

function Root() {
  const [showPreview, setShowPreview] = useState(() => window.location.hash === '#design-preview');

  useEffect(() => {
    const onHashChange = () => setShowPreview(window.location.hash === '#design-preview');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return showPreview ? <DesignPreview /> : <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
