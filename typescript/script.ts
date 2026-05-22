// Fanstasy Quest Manager - jednoduchý základ

import { Rasa, dataHrdinu } from "./data.js";

//Abstraktní třída Hrdina

abstract class Hrdina {
    private id: number;
    private jmeno: string;
    private level: number;
    private zakladniHP: number;

    protected sila: number;
    protected obratnost: number;
    protected inteligence: number;
    protected vydrz: number;


    protected rasa: Rasa;

    constructor(

        id: number,
        jmeno: string,
        level: number,
        zakladniHP: number,
        sila: number,
        obratnost: number,
        inteligence: number,
        vydrz: number,
        rasa: Rasa
    ){
        if(id <= 0) {
            throw new Error("ID musí být kladné číslo");
        }

        if(jmeno.trim() === "") {
            throw new Error("Jméno nesmí být prázdné");
        }

        if(level < 1) {
            throw new Error("Level musí být alespoň 1");
        }

        if(zakladniHP <= 0) {
            throw new Error("Základní HP musí být kladné číslo");
        }

        if(!rasa) {
            throw new Error("Rasa musí být definována");
        }

        if (sila < 0 || obratnost < 0 || inteligence < 0 || vydrz < 0) {
            throw new Error("Atributy nesmí být záporné");
    
    }
        this.id = id
        this.jmeno = jmeno
        this.level = level
        this.zakladniHP= zakladniHP

        this.sila = sila
        this.obratnost = obratnost
        this.inteligence = inteligence
        this.vydrz = vydrz
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
    abstract getPovolani(): string;

    //Vypis informaci
    public vypisInfo(): void {

    console.log("===============================");
    console.log(`ID: ${this.id}`);
    console.log(`Jméno: ${this.jmeno}`);

    console.log(`Povolání: ${this.getPovolani()}`);
    console.log(`Rasa: ${this.getRasa()}`);

    console.log(`Level: ${this.level}`);

    console.log("-------------------------------");

    console.log(`Síla: ${this.sila}`);
    console.log(`Obratnost: ${this.obratnost}`);
    console.log(`Inteligence: ${this.inteligence}`);
    console.log(`Výdrž: ${this.vydrz}`);

    console.log("-------------------------------");

    console.log(`Finální HP: ${this.vypocitejFinalniHP()}`);
    console.log(`Finální útok: ${this.vypocitejFinalniPoskozeni()}`);

    console.log("===============================");
}
}

//Třída Válečník

class Valecnik extends Hrdina {

    constructor(
        id: number,
        jmeno: string,
        level: number,
        sila: number,
        obratnost: number,
        inteligence: number,
        vydrz: number,
        rasa: Rasa,
    ) {
        super(id, jmeno, level, 120, sila, obratnost, inteligence, vydrz, rasa);
    }
     public vypocitejFinalniHP(): number {

        return this.getZakladniHP()
            + (this.vydrz + this.rasa.bonusVydrz) * 20
            + this.getLevel() * 10;
    }

    public vypocitejFinalniPoskozeni(): number {

        return (this.sila + this.rasa.bonusSila) * 5
            + this.getLevel() * 2;
    }

    public getPovolani(): string {
        return "Válečník";
    }
}

//Třída Mág

class Mag extends Hrdina {

    constructor(
        id: number,
        jmeno: string,
        level: number,
        sila: number,
        obratnost: number,
        inteligence: number,
        vydrz: number,
        rasa: Rasa,
    ) {
        super(id, jmeno, level, 80, sila, obratnost, inteligence, vydrz, rasa);
    }
        public vypocitejFinalniHP(): number {
        
            return this.getZakladniHP()
            + (this.vydrz + this.rasa.bonusVydrz) * 10
            + this.getLevel() * 5;
    }

    public vypocitejFinalniPoskozeni(): number {
        return (this.inteligence + this.rasa.bonusInteligence) * 9
            + this.getLevel() * 3;
    }

    public getPovolani(): string {
        return "Mág";
    }
}

//Třída Lukostřelec

class Lukostrelec extends Hrdina {
    
    constructor(
        id: number,
        jmeno: string,
        level: number,
        sila: number,
        obratnost: number,
        inteligence: number,
        vydrz: number,
        rasa: Rasa,
    ) {
        super(id, jmeno, level, 100, sila, obratnost, inteligence, vydrz, rasa);
    }
        public vypocitejFinalniHP(): number {

        return this.getZakladniHP()
            + (this.vydrz + this.rasa.bonusVydrz) * 15
            + this.getLevel() * 7;
    }

    public vypocitejFinalniPoskozeni(): number {
        return (this.obratnost + this.rasa.bonusObratnost) * 7
            + this.getLevel() * 2;
    }

    public getPovolani(): string {
        return "Lukostřelec";
    }
}

//Oživení dat

const pouzitaId = new Set<number>();
const parta: Hrdina[] = [];

for (const data of dataHrdinu) {

    if (pouzitaId.has(data.id)) {
        throw new Error(`ID ${data.id} je již použito`);
    }
    pouzitaId.add(data.id);

    let hrdina: Hrdina;

    switch (data.typ) {

        case "valecnik":
            hrdina = new Valecnik(
                data.id,
                data.jmeno,
                data.level,
                data.sila,
                data.obratnost,
                data.inteligence,
                data.vydrz,
                data.rasa
            );
            break;

        case "mag":
            hrdina = new Mag(
                data.id,
                data.jmeno,
                data.level,
                data.sila,
                data.obratnost,
                data.inteligence,
                data.vydrz,
                data.rasa
            );
            break;

        case "lukostrelec":
            hrdina = new Lukostrelec(
                data.id,
                data.jmeno,
                data.level,
                data.sila,
                data.obratnost,
                data.inteligence,
                data.vydrz,
                data.rasa
            );
            break;

        default:
            throw new Error("Neznámý typ postavy");
    }

    parta.push(hrdina);
}

//Testování + polymorfismus

console.log("======= AKTIVNÍ DRUŽINA =======");

let celkovePoskozeni = 0;
let celkovaHP = 0;

for (const hrdina of parta) {

    hrdina.vypisInfo();

    celkovePoskozeni += hrdina.vypocitejFinalniPoskozeni();
    celkovaHP += hrdina.vypocitejFinalniHP();
}

console.log("======= SOUHRN DRUŽINY =======");
console.log(`Celkové poškození družiny: ${celkovePoskozeni}`);
console.log(`Celkové HP družiny: ${celkovaHP}`);