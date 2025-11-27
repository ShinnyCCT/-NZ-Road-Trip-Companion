import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
    // 註冊 /sw.js 檔案作為 Service Worker
    window.addEventListener('load', () => {
        //navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('Service Worker 註冊成功, 範圍:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker 註冊失敗:', error);
            });
    });
}