import {useDeviceStore} from "~/stores/useDeviceStore";
import {useNavigationStore} from "~/stores/useNavigationStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

export function useContextActions() {
    const store = useDeviceStore();
    const navStore = useNavigationStore();
    const settings = useAppSettingsStore();

    function getHandler(buttonRole: string): (() => void) | null {
        const action = store.currentAction;

        if (action === '') {
            if (buttonRole === 'left') {
                return () => store.toggleFontSize();
            }
            if (buttonRole === 'middle') {
                return () => store.toggleModal('GroupSelectionModal');
            }
            if (buttonRole === 'right' && store.hasManDownFeature) {
                return () => store.manDownActive
                    ? store.toggleManDown()
                    : store.toggleModal('ManDownModal');
            }
            return null;
        }

        if (action === 'toggleLock') {
            if (buttonRole === 'left') {
                return () => {
                    store.toggleLock();
                    store.closeCurrentModal();
                };
            }
            if (buttonRole === 'right') return () => store.closeCurrentModal();
            return null;
        }

        if (action === 'selectGroup') {
            if (buttonRole === 'left') {
                return () => {
                    store.confirmGroupChange(navStore.currentGroup, navStore.currentFolder);
                    store.closeCurrentModal();
                    settings.stopModalTimer();
                };
            }
            if (buttonRole === 'right') return () => store.closeCurrentModal();
            return null;
        }

        if (action === 'emergency') {
            if (buttonRole === 'left') return () => store.cancelEmergency();
            return null;
        }

        return null;
    }

    function isBlocked(): boolean {
        return store.locked && store.currentAction !== 'toggleLock';
    }

    return {getHandler, isBlocked};
}
