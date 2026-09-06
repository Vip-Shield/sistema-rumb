// Este arquivo permite que o PWA funcione offline no futuro
self.addEventListener('install', (event) => {
    console.log('RUMB Service Worker instalado com sucesso.');
});

self.addEventListener('fetch', (event) => {
    // Aqui você pode adicionar lógica de cache
});