/**
 * 📱 PWA Service - Gestione Progressive Web App
 */

class PWAService {
    constructor() {
        this.isInstalled = false;
        this.deferredPrompt = null;
        this.init();
    }

    // Inizializza PWA
    init() {
        // Registra service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('📱 Service Worker registrato:', registration);
                })
                .catch(error => {
                    console.error('❌ Errore registrazione SW:', error);
                });
        }

        // Ascolta evento beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Controlla se è già installata
        this.checkInstallation();
    }

    // Mostra prompt installazione
    showInstallPrompt() {
        const installBanner = document.createElement('div');
        installBanner.id = 'install-banner';
        installBanner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(139, 92, 246, 0.95);
            color: white;
            padding: 16px 24px;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 1000;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.1);
            animation: slideUp 0.3s ease;
        `;

        installBanner.innerHTML = `
            <span>📱 Installa MyZubster</span>
            <button id="install-btn" style="
                background: white;
                border: none;
                padding: 8px 20px;
                border-radius: 8px;
                color: #8b5cf6;
                font-weight: bold;
                cursor: pointer;
            ">Installa</button>
            <button id="close-install" style="
                background: transparent;
                border: none;
                color: rgba(255,255,255,0.7);
                cursor: pointer;
                font-size: 18px;
            ">✕</button>
        `;

        document.body.appendChild(installBanner);

        // Aggiungi stili per l'animazione
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(100px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Eventi
        document.getElementById('install-btn').addEventListener('click', () => {
            this.installApp();
        });

        document.getElementById('close-install').addEventListener('click', () => {
            installBanner.remove();
        });
    }

    // Installa app
    async installApp() {
        if (!this.deferredPrompt) {
            return;
        }

        try {
            await this.deferredPrompt.prompt();
            const result = await this.deferredPrompt.userChoice;
            
            if (result.outcome === 'accepted') {
                this.isInstalled = true;
                console.log('✅ App installata!');
                document.getElementById('install-banner')?.remove();
            } else {
                console.log('⚠️ Installazione rifiutata');
            }
            
            this.deferredPrompt = null;
        } catch (error) {
            console.error('❌ Errore installazione:', error);
        }
    }

    // Controlla se l'app è già installata
    checkInstallation() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('📱 App già installata');
        }
    }

    // Invia notifica push
    async sendPushNotification(title, body) {
        try {
            // Richiedi permessi
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                // Invia notifica
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification(title, {
                    body: body,
                    icon: '/icons/icon-192.png',
                    badge: '/icons/icon-192.png',
                    vibrate: [200, 100, 200]
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Errore notifica:', error);
            return false;
        }
    }
}

// Esporta il servizio
export const pwaService = new PWAService();
