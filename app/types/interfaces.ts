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
    left: string | null;
    middle: string | null;
    right: string | null;
}

export enum Mode {
    DMO = "DMO",
    TMO = "TMO",
}