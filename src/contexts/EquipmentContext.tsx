import { createContext } from "react";

export type Equipment = {
    id : string;
    name: string;
    description: string;
}

//配列型のContextをexport
export const EquipmentContext = createContext<Equipment[]>([]);
