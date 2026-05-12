// Fanstasy Quest Manager - jednoduchý základ

//Datový číselník ras

type Rasa = {
    nazev: string;
    bonusSila: number;
    bonusObratnost: number;
    bonusInteligence: number;
    bonusVydrz: number;
}

const Rasy: Rasa[] = [
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

//Abstraktní třída Hrdina

abstract class Hrdina {
    private id: number;
    private jmeno: string;
    private level: number;
    private zakladniHP: number;

    protected sila: number;
    protected obratnost: number;
    protected inteligence: number;

    protected rasa: Rasa;

    constructor(
        id: number,
        jmeno: string,
        level: number,
        zakladniHP: number,
        sila: number,
        obratnost: number,
        inteligence: number,
        rasa: Rasa
    ) {
        this.id = id
        this.jmeno = jmeno
        this.level = level
        this.zakladniHP= zakladniHP

        this.sila = sila
        this.obratnost = obratnost
        this.inteligence = inteligence

        this.rasa = rasa
    }

    //Gettery
    public getId(): number {
        return this.id;
    }

    public getJmeno(): string {
        return this.jmeno;
    }

    public getLevel(): number {
        return this.level;
    }

    public getZakladniHP(): number {
        return this.zakladniHP;
    }

    public getRasa(): string {
        return this.rasa.nazev;
    }

    //Abstraktni metody
    abstract vypocitejFinalniHP(): number;
    abstract vypocitejFinalniPoskozeni(): number;

    //Vypis informaci
    public vypisInfo(): void {
        console.log("================================");
        console.log(`ID: ${this.id}`);
        console.log(`Jméno: ${this.jmeno}`);
        console.log(`Rasa: ${this.getRasa()}`);
        console.log(`Level: ${this.level}`);
        console.log(`HP: ${this.vypocitejFinalniHP()}`);
        console.log(`Útok: ${this.vypocitejFinalniPoskozeni()}`);
    }
}

//Třída