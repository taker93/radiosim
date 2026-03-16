export interface Root {
    folders: Folder[];
    description?: string; // Optional: Beschreibung der Konfiguration
}

export interface Folder {
    id: number;
    name: string;
    groups?: Group[]; // Optional: Kann Gruppen enthalten
    subFolders?: Folder[]; // Optional: Kann Unterordner enthalten
}

export interface Group {
    number: number;
    name: string;
    mode: Mode;
}

export interface Contexts {
    [key: string]: string | null;
    left: string | null;
    middle: string | null;
    right: string | null;
}

export interface ContextButtonDef {
    id: string;
    role: 'left' | 'middle' | 'right' | string;
    icon?: string;
}

export interface HardwareFeatures {
    hasNavigationKnob: boolean;
    hasKeypad: boolean;
    hasLEDs: boolean;
    hasCallButtons: boolean;
}

export interface DeviceStyles {
    screen: {
        contentHeightClass: string;
        showTitle: boolean;
        statusBar: string;
        statusText: string;
        timeDate: string;
        groupInfo: string;
        noGroupBox: string;
        contextHints: string;
        spacing: string;
    };
    bootScreen: {
        logoSize: string;
        superscriptSize: string;
    };
    contextButtons: {
        marginTopClass: string;
    };
    keypad: {
        buttonHeightClass: string;
        colGapClass: string;
        rowGapClass: string;
    };
    navigationKnob: {
        variant: 'side' | 'front';
    };
    navigationButtons: {
        layout: 'horizontal' | 'vertical';
    };
}

export interface DeviceProfile {
    id: string;
    name: string;
    contextButtons: ContextButtonDef[];
    hardware: HardwareFeatures;
    pageLayout: 'side-by-side' | 'stacked';
    defaultContexts: Record<string, string | null>;
    defaultContextsManDown: Record<string, string | null>;
    styles: DeviceStyles;
}

export enum Mode {
    DMO = "DMO",
    TMO = "TMO",
}