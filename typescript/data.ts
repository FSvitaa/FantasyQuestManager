//Datový číselník ras

export type Rasa = {
    nazev: string;
    bonusSila: number;
    bonusObratnost: number;
    bonusInteligence: number;
    bonusVydrz: number;
}

export const Rasy: Rasa[] = [
    {
        nazev: "Trpaslík",
        bonusSila: 2,
        bonusObratnost: -1,
        bonusInteligence: 0,
        bonusVydrz: 3
    },
    {
        nazev: "Elf",
        bonusSila: -1,
        bonusObratnost: 3,
        bonusInteligence: 2,
        bonusVydrz: -1
    },
    {
        nazev: "Člověk",
        bonusSila: 1,
        bonusObratnost: 1,
        bonusInteligence: 1,
        bonusVydrz: 1
    },
    {
        nazev: "Ork",
        bonusSila: 3,
        bonusObratnost: -2,
        bonusInteligence: -2,
        bonusVydrz: 2
    }
];

//Surová data pro hrdiny

export const dataHrdinu = [

    {
        typ: "valecnik",
        id: 1,
        jmeno: "Thorin",
        level: 5,
        sila: 10,
        obratnost: 4,
        inteligence: 2,
        vydrz: 9,
        rasa: Rasy[0]
    },

    {
        typ: "mag",
        id: 2,
        jmeno: "Elrond",
        level: 6,
        sila: 2,
        obratnost: 5,
        inteligence: 12,
        vydrz: 4,
        rasa: Rasy[1]
    },

    {
        typ: "lukostrelec",
        id: 3,
        jmeno: "Legolas",
        level: 7,
        sila: 4,
        obratnost: 13,
        inteligence: 5,
        vydrz: 4,
        rasa: Rasy[1]
    }
];