// /data/folderData.ts
import {Mode, type Root} from "~/types/interfaces";

/**
 * TMO & DMO Gruppenmatrix - Abgerufen von https://bks-portal.rlp.de/organisation/autorisierte-stelle am 13.11.2024
 */
export const folderData: Root = {
    description: "Standardkonfiguration für FunkSim",
    folders: [
        {
            id: 16,
            name: "Fw/Kats",
            subFolders: [
                {
                    id: 160,
                    name: "RLP",
                },
                {
                    id: 161,
                    name: "LK AK",
                },
                {
                    id: 169,
                    name: "LK EMS",
                    groups: [
                        {name: "RP EMS", number: 2480, mode: Mode.TMO},
                        {name: "RP EMS K1 Fü", number: 2481, mode: Mode.TMO},
                    ],
                    subFolders: [
                        {
                            id: 1690,
                            name: "VG Bad Ems",
                        },
                        {
                            id: 1691,
                            name: "VG Diez",
                            groups: [
                                {name: "RP DIEZ F1", number: 2505, mode: Mode.TMO},
                                {name: "RP DIEZ F2", number: 2506, mode: Mode.TMO},
                                {name: "RP DIEZ F3", number: 2507, mode: Mode.TMO},
                            ]
                        }
                    ]
                },
                {
                    id: 184,
                    name: "LK TR",
                }
            ]
        },
        {
            id: 10,
            name: "RettD",
        },
        {
            id: 25,
            name: "DMO RP",
            subFolders: [
                {
                    id: 250,
                    name: "DMO FW",
                    groups: [
                        {name: "310_F*", number: 310, mode: Mode.DMO},
                        {name: "311_F*", number: 311, mode: Mode.DMO}
                    ],
                },
            ],
        }
    ]
};
