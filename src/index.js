import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Desabilitar arraste de imagens globalmente
const disableImageDrag = () => {
  // Função para desabilitar arraste em todas as imagens
  const disableDragOnImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.setAttribute('ondragstart', 'return false;');
      img.setAttribute('oncontextmenu', 'return false;');
      img.setAttribute('onselectstart', 'return false;');
      
      // Remove todos os event listeners de drag
      img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, { passive: false, capture: true });
      
      img.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
      }, { passive: false });
      
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      }, { passive: false });
      
      img.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Botão esquerdo
          e.preventDefault();
        }
      }, { passive: false });
    });
  };

  // Executa imediatamente
  disableDragOnImages();

  // Observa mudanças no DOM para imagens carregadas dinamicamente
  const observer = new MutationObserver(() => {
    disableDragOnImages();
  });

  // Observa mudanças em todo o documento
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Previne dragstart globalmente para imagens
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'img' || e.target.closest('img')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { passive: false, capture: true });

  // Previne seleção de texto em imagens
  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'img') {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Previne menu de contexto em imagens
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'img') {
      e.preventDefault();
      return false;
    }
  }, { passive: false });
};

// Executa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', disableImageDrag);
} else {
  disableImageDrag();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
