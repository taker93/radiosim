// /stores/useDeviceStore.ts

import dayjs from 'dayjs';
import type {Contexts, Folder, Group} from "~/types/interfaces";
import {Mode} from "~/types/interfaces";
import {useSound} from "~/composables/useSound";

export const useDeviceStore = defineStore('device', {
    state: () => ({
        isPoweredOff: true,
        isBooting: false,
        led1Color: '',
        led2Color: '',
        status: 'DMO Modus',
        time: dayjs().format('HH:mm'),
        date: dayjs().format('DD.MM.YYYY'),
        dateTimeInterval: null as NodeJS.Timeout | null,
        group: null as Group | null,
        folder: null as Folder | null,
        isModalOpen: false,  // Neuer Zustand für das Modal
        activeModal: '',
        currentAction: '', // Neue Eigenschaft für die aktuelle Aktion
        locked: false,
        contexts: {
            left: 'Schrift',
            middle: 'Gruppe',
            right: 'Hilfe',
        } as Contexts,
        showCheckmark: false,
        showFail: false,
        hasSDS: false,
        hasManDownFeature: false,
        manDownActive: false,
        manDownWarning: false,
    }),
    actions: {
        updateDateTime() {
            this.time = dayjs().format('HH:mm');
            this.date = dayjs().format('DD.MM.YYYY');
        },
        closeCurrentModal() {
            console.log('closeCurrentModal');
            this.isModalOpen = false;
            this.activeModal = '';
        },
        toggleModal(modalName: string) {
            console.log('toggleModal');
            this.isModalOpen = !this.isModalOpen; // Aktion zum Umschalten des Modals
            this.activeModal = this.isModalOpen ? modalName : '';
        },
        setCurrentAction(action: string) {
            this.currentAction = action;  // Aktion setzen, die die Navigation ausführen soll
        },
        setStatus(status: string) {
            this.status = status;
        },
        setContexts(menu: Contexts) {
            this.contexts = menu;
        },
        resetContextmenu() {
            this.contexts = {
                left: 'Schrift',
                middle: 'Gruppe',
                right: this.hasManDownFeature ? 'Tot E/A' : 'Hilfe',
            };
        },
        toggleLock() {
            this.locked = !this.locked;
        },
        confirmGroupChange(selectedGroup: Group | null, selectedFolder: Folder | null) {
            const {playSound} = useSound();

            if (!selectedGroup || !selectedGroup.name) {
                console.warn('No group was selected');

                this.showFail = true;
                playSound('/sounds/fail.wav');
                setTimeout(() => {
                    this.showFail = false;
                }, 2000);

                return;
            }

            if (
                this.group === null ||
                (this.group?.mode === Mode.DMO && selectedGroup.mode === Mode.TMO) ||
                (this.group?.mode === Mode.TMO && selectedGroup.mode === Mode.DMO)
            ) {
                this.showCheckmark = true;
                playSound('/sounds/mode_change.wav');
                setTimeout(() => {
                    this.showCheckmark = false;
                    playSound('/sounds/mode_change.wav');
                }, 2000);
            }

            this.group = selectedGroup;
            this.folder = selectedFolder;

            if (selectedGroup.mode === Mode.TMO) {
                this.setStatus('__Status 2__');
            } else {
                this.setStatus('DMO Modus');
            }
        },
        powerOn() {
            this.isPoweredOff = false;
            this.isBooting = true;
            if (this.dateTimeInterval) {
                clearInterval(this.dateTimeInterval);
            }
            this.dateTimeInterval = setInterval(() => {
                this.updateDateTime();
            }, 60000); // Alle 60 Sekunden aktualisieren
        },
        powerOff() {
            this.isPoweredOff = true;
            if (this.dateTimeInterval) {
                clearInterval(this.dateTimeInterval);
                this.dateTimeInterval = null;
            }
        },
        setManDownFeature(config: boolean) {
            this.hasManDownFeature = config;
            this.resetContextmenu();
        },
        toggleManDown() {
            this.manDownActive = !this.manDownActive;
        },
        toggleManDownWarning() {
            this.manDownWarning = !this.manDownWarning;
            this.toggleModal('ManDownWarningModal');
        }
    },
    getters: {
        isGroupSelected(): boolean {
            return this.group !== null && this.folder !== null;
        },
        getContexts(): Contexts {
            return this.contexts;
        }
    }
});
