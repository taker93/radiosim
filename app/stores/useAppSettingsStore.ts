const WELCOME_STORAGE_KEY = 'funksim-welcome-closed';
const CALLSIGN_STORAGE_KEY = 'funksim-callsign';

// /stores/useAppSettingsStore.ts
export const useAppSettingsStore = defineStore('settings', {
    state: () => ({
        modalTimer: null as NodeJS.Timeout | null,
        modalPostAction: {} as Function,
        modalTimeout: 5, // Standard Timeout von 5 Sekunden
        debug: false,
        welcomeMessageClosed: false,
        callsign: '',
    }),
    actions: {
        setModalTimeout(timeout: number) {
            this.modalTimeout = timeout;
        },
        startModalTimer(postAction: Function) {
            this.modalPostAction = postAction;

            if (this.modalTimer) {
                clearTimeout(this.modalTimer);
            }

            this.modalTimer = setTimeout(() => {
                console.info("Running postAction for modal...");
                postAction();
            }, this.modalTimeout * 1000); // 5 Sekunden Timer
        },
        resetModalTimer() {
            if (this.modalTimer != null) {
                this.startModalTimer(this.modalPostAction); // Setzt den Timer zurück und startet ihn neu
            }
        },
        stopModalTimer() {
            if (this.modalTimer) {
                console.info('clearing timer...');
                clearTimeout(this.modalTimer);
                this.modalTimer = null;
            }
        },
        loadWelcomeState() {
            this.welcomeMessageClosed = localStorage.getItem(WELCOME_STORAGE_KEY) === 'true';
        },
        closeWelcomeMessage() {
            this.welcomeMessageClosed = true;
            localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
        },
        loadCallsign() {
            this.callsign = localStorage.getItem(CALLSIGN_STORAGE_KEY) ?? '';
        },
        setCallsign(value: string) {
            this.callsign = value;
            localStorage.setItem(CALLSIGN_STORAGE_KEY, value);
        },
    },
});
