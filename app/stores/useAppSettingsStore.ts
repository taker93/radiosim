// /stores/useAppSettingsStore.ts
export const useAppSettingsStore = defineStore('settings', {
    state: () => ({
        modalTimer: null as NodeJS.Timeout | null,
        modalPostAction: {} as Function,
        modalTimeout: 5, // Standard Timeout von 5 Sekunden
        debug: false,
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
    },
});
