import type { DeviceProfile } from '~/types/interfaces';

export const scc3Profile: DeviceProfile = {
    id: 'lkcc',
    name: 'LKCC',
    contextButtons: [
        { id: 'f1', role: 'left',   icon: 'material-symbols:circle-outline' },
        { id: 'f2', role: 'middle', icon: 'material-symbols:check-box-outline-blank' },
        { id: 'f3', role: 'right',  icon: 'material-symbols:circle-outline' },
    ],
    pageLayout: 'stacked',
    hardware: {
        hasNavigationKnob: true,
        hasKeypad: true,
        hasLEDs: true,
        hasCallButtons: true,
    },
    defaultContexts: {
        left: 'Schrift',
        middle: 'Gruppe',
        right: 'Hilfe',
    },
    defaultContextsManDown: {
        left: null,
        middle: 'Gruppe',
        right: null,
    },
    styles: {
        screen: {
            contentHeightClass: 'flex-1 min-h-0',
            showTitle: false,
            statusBar:    'h-3 py-1 text-xs',
            statusText:   'text-[9px] tracking-wider',
            statusTextLarge: 'text-sm tracking-wider',
            timeDate:     'text-base',
            timeDateLarge: 'text-xl',
            groupInfo:    'text-xs',
            groupInfoLarge: 'text-base',
            noGroupBox:   'text-[10px] p-1 m-1 border border-blue-500',
            contextHints: 'text-[8px]',
            spacing:      'space-y-0.5 py-0.5 px-1',
        },
        bootScreen: { logoSize: 'text-4xl', superscriptSize: 'text-sm' },
        contextButtons: { marginTopClass: 'mt-0.5' },
        keypad: { buttonHeightClass: 'h-7', colGapClass: 'gap-x-2', rowGapClass: 'gap-y-4' },
        navigationKnob: { variant: 'front' },
        navigationButtons: { layout: 'vertical' },
    },
};
