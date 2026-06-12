// TYP RASY - Jak má vypadat každá rasa (jaké má vlastnosti)
export type Rasa = {
    nazev: string;
    bonusSila: number;              // Vliv na sílu
    bonusObratnost: number;         // Vliv na obratnost
    bonusInteligence: number;       // Vliv na intelekt
    bonusVydrz: number;             // Vliv na výdrž
}

// SEZNAM VŠECH RAS - Jaké rasy si můžeš vybrat v aplikaci
export const Rasy: Rasa[] = [
    { nazev: "Trpaslík", bonusSila: 2, bonusObratnost: -1, bonusInteligence: 0, bonusVydrz: 3 },
    { nazev: "Elf", bonusSila: -1, bonusObratnost: 3, bonusInteligence: 2, bonusVydrz: -1 },
    { nazev: "Člověk", bonusSila: 1, bonusObratnost: 1, bonusInteligence: 1, bonusVydrz: 1 },
    { nazev: "Ork", bonusSila: 3, bonusObratnost: -2, bonusInteligence: -2, bonusVydrz: 2 }
];

// DATABÁZE HRDINŮ - Prázdné na startu, budeme sem přidávat hrdiny když je vytvoříš
export const dataHrdinu: any[] = [];