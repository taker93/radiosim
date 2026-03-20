// /stores/useDeviceStore.ts

import dayjs from 'dayjs';
import type {Contexts, DeviceProfile, Folder, Group} from "~/types/interfaces";
import {Mode} from "~/types/interfaces";
import {lk24Profile} from "~/deviceProfiles/lk24";
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
        activeProfile: lk24Profile as DeviceProfile,
        contexts: { ...lk24Profile.defaultContexts } as Record<string, string | null>,
        showCheckmark: false,
        showFail: false,
        hasSDS: false,
        hasManDownFeature: false,
        manDownActive: false,
        manDownWarning: false,
        fontSizeLarge: false,
        isPTTActive: false,
        isPTTCallActive: false,
        isEmergencyActive: false,
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
        setContexts(menu: Record<string, string | null>) {
            this.contexts = menu;
        },
        resetContextmenu() {
            this.contexts = this.hasManDownFeature
                ? { ...this.activeProfile.defaultContextsManDown }
                : { ...this.activeProfile.defaultContexts };
        },
        setActiveProfile(profile: DeviceProfile) {
            this.activeProfile = profile;
            this.resetContextmenu();
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
        },
        toggleFontSize() {
            this.fontSizeLarge = !this.fontSizeLarge;
        },
        activatePTT() {
            if (this.isPoweredOff || this.isBooting || this.locked) return;
            this.isPTTActive = true;
            this.isPTTCallActive = true;
            this.led1Color = 'green';
        },
        deactivatePTT() {
            this.isPTTActive = false;
            this.led1Color = '';
        },
        endPTTCall() {
            this.isPTTCallActive = false;
        },
        cancelPTTCall() {
            this.isPTTActive = false;
            this.isPTTCallActive = false;
            this.led1Color = '';
        },
        triggerEmergency() {
            if (this.isPoweredOff || this.isBooting) return;
            this.isEmergencyActive = true;
            this.toggleModal('EmergencyModal');
        },
        cancelEmergency() {
            this.isEmergencyActive = false;
            this.closeCurrentModal();
        },
        pressFunctionButton() {
            if (this.isPoweredOff || this.isBooting || this.locked) return;
            console.log('Funktionstaste gedrückt');
        },
    },
    getters: {
        isGroupSelected(): boolean {
            return this.group !== null && this.folder !== null;
        },
        getContexts(): Record<string, string | null> {
            return this.contexts;
        }
    }
});
