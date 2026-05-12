"use strict";
// Fanstasy Quest Manager - jednoduchý základ
const Rasy = [
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
class Hrdina {
    id;
    jmeno;
    level;
    zakladniHP;
    sila;
    obratnost;
    inteligence;
    rasa;
    constructor(id, jmeno, level, zakladniHP, sila, obratnost, inteligence, rasa) {
        this.id = id;
        this.jmeno = jmeno;
        this.level = level;
        this.zakladniHP = zakladniHP;
        this.sila = sila;
        this.obratnost = obratnost;
        this.inteligence = inteligence;
        this.rasa = rasa;
    }
    //Gettery
    getId() {
        return this.id;
    }
    getJmeno() {
        return this.jmeno;
    }
    getLevel() {
        return this.level;
    }
    getZakladniHP() {
        return this.zakladniHP;
    }
    getRasa() {
        return this.rasa.nazev;
    }
    //Vypis informaci
    vypisInfo() {
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
