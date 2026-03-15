// /composables/useSound.ts
import {useSoundStore} from '@/stores/useSoundStore';
import {useDeviceStore} from "~/stores/useDeviceStore";

type SoundJob = {
    path: string
    loop: boolean
    resolve: (audio: HTMLAudioElement | null) => void
}

const soundQueue: SoundJob[] = []
let isProcessing = false

export function useSound() {
    const device = useDeviceStore()
    const store = useSoundStore()
    const {isSoundPlaying, currentAudio, loopedAudio, lockTimeout} = storeToRefs(store)

    function enqueueSound(path: string, loop: boolean): Promise<HTMLAudioElement | null> {
        // Fall 1: Sound steht bereits in der Queue
        const isQueued = soundQueue.some(job => job.path === path && job.loop === loop)

        // Fall 2: Sound läuft bereits aktiv (loopend oder einmalig)
        const isAlreadyPlaying =
            (loop && loopedAudio.value?.src?.includes(path)) ||
            (!loop && currentAudio.value?.src?.includes(path))

        if (isQueued || isAlreadyPlaying) {
            return Promise.resolve(null)
        }

        return new Promise((resolve) => {
            soundQueue.push({path, loop, resolve})
            processQueue()
        })
    }


    async function processQueue() {
        if (isProcessing) return
        isProcessing = true

        while (soundQueue.length > 0) {
            const {path, loop, resolve} = soundQueue.shift()!

            if (device.isPoweredOff || device.isBooting) {
                resolve(null)
                continue
            }

            if (loop) {
                // Looping Sound sofort abspielen, nicht warten
                if (loopedAudio.value) {
                    loopedAudio.value.pause()
                    loopedAudio.value.currentTime = 0
                }

                const audio = new Audio(path)
                audio.loop = true
                audio.play().catch(err => console.error("Loop-Sound konnte nicht abgespielt werden:", err))
                loopedAudio.value = audio
                resolve(audio)
                continue
            }

            // Nicht-loopender Sound: aktiven stoppen
            if (isSoundPlaying.value && currentAudio.value) {
                currentAudio.value.pause()
                currentAudio.value.currentTime = 0
            }

            const audio = new Audio(path)
            currentAudio.value = audio
            isSoundPlaying.value = true

            try {
                await audio.play()
            } catch (err) {
                console.error("Sound konnte nicht abgespielt werden:", err)
                isSoundPlaying.value = false
                currentAudio.value = null
                resolve(null)
                continue
            }

            // Sperrzeit nach dem Sound + 100ms Pause
            await new Promise(resolve => {
                if (lockTimeout.value) clearTimeout(lockTimeout.value)

                lockTimeout.value = setTimeout(() => {
                    isSoundPlaying.value = false
                    currentAudio.value = null
                    resolve(null)
                }, audio.duration * 1000 + 100) // Sounddauer + kleine Pause
            })

            resolve(audio)
        }

        isProcessing = false
    }

    function stopSound() {
        store.stopCurrentSound()
        store.stopLoopSound()
        // Optional: Queue abbrechen
        soundQueue.length = 0
        isProcessing = false
    }

    return {
        playSound: enqueueSound,
        stopSound
    }
}