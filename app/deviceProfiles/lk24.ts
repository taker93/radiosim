import type { DeviceProfile } from '~/types/interfaces';

export const lk24Profile: DeviceProfile = {
    id: 'lk24',
    name: 'LK24',
    contextButtons: [
        { id: 'left',   role: 'left',   icon: 'material-symbols:circle-outline' },
        { id: 'middle', role: 'middle', icon: 'material-symbols:check-box-outline-blank' },
        { id: 'right',  role: 'right',  icon: 'material-symbols:circle-outline' },
    ],
    pageLayout: 'side-by-side',
    hardware: {
        hasNavigationKnob: true,
        hasKeypad: true,
        hasLEDs: true,
        hasCallButtons: true,
        hasPTT: true,
        hasEmergencyButton: true,
        hasFunctionButtons: true,
    },
    defaultContexts: {
        left: 'Schrift',
        middle: 'Gruppe',
        right: 'Hilfe',
    },
    defaultContextsManDown: {
        left: 'Schrift',
        middle: 'Gruppe',
        right: 'Tot E/A',
    },
    styles: {
        screen: {
            contentHeightClass: 'min-h-80 max-h-80',
            showTitle: true,
            statusBar:    'h-4 py-3 text-lg',
            statusText:   'text-base tracking-widest',
            statusTextLarge: 'text-xl tracking-widest',
            timeDate:     'text-3xl',
            timeDateLarge: 'text-4xl',
            groupInfo:    'text-2xl',
            groupInfoLarge: 'text-3xl',
            noGroupBox:   'text-xl p-2 m-2 border-2 border-blue-500',
            contextHints: 'text-[10px]',
            spacing:      'space-y-1 py-1 px-2',
        },
        bootScreen: { logoSize: 'text-6xl', superscriptSize: 'text-sm' },
        contextButtons: { marginTopClass: 'mt-4' },
        keypad: { buttonHeightClass: 'h-6', colGapClass: 'gap-x-2', rowGapClass: 'gap-y-2' },
        navigationKnob: { variant: 'side' },
        navigationButtons: { layout: 'horizontal' },
        sidePanel: { widthClass: 'w-14', pttHeightClass: 'h-20' },
    },
};
