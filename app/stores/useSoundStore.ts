export const useSoundStore = defineStore('sound', {
    state: () => ({
        isSoundPlaying: false,
        currentAudio: null as HTMLAudioElement | null,
        loopedAudio: null as HTMLAudioElement | null,
        lockTimeout: null as NodeJS.Timeout | null,
    }),
    actions: {

        stopCurrentSound() {
            if (this.currentAudio) {
                this.currentAudio.pause()
                this.currentAudio.currentTime = 0
                this.currentAudio = null
                this.isSoundPlaying = false
            }
            if (this.lockTimeout) {
                clearTimeout(this.lockTimeout)
                this.lockTimeout = null
            }
        },

        stopLoopSound() {
            if (this.loopedAudio) {
                this.loopedAudio.pause()
                this.loopedAudio.currentTime = 0
                this.loopedAudio = null
            }
        }

    }
});

