// Import typů a dat z externího souboru
import { Rasy } from "./data.js";
// --- ABSTRAKTNÍ RODIČOVSKÁ TŘÍDA PRO HRDINY ---
class Hrdina {
    // Zapouzdřené vlastnosti přístupné pouze uvnitř této třídy
    id;
    jmeno;
    level;
    zakladniHP;
    // Chráněné vlastnosti přístupné i pro dědící podtřídy
    sila;
    obratnost;
    inteligence;
    vydrz;
    rasa;
    // Konstruktor s okamžitou validací vstupních dat
    constructor(id, jmeno, level, zakladniHP, sila, obratnost, inteligence, vydrz, rasa) {
        if (id <= 0) {
            throw new Error("ID musí být kladné číslo");
        }
        if (jmeno.trim() === "") {
            throw new Error("Jméno nesmí být prázdné");
        }
        if (level < 1) {
            throw new Error("Level musí být alespoň 1");
        }
        if (zakladniHP <= 0) {
            throw new Error("Základní HP musí být kladné číslo");
        }
        if (!rasa) {
            throw new Error("Rasa musí být definována");
        }
        if (sila < 0 || obratnost < 0 || inteligence < 0 || vydrz < 0) {
            throw new Error("Atributy nesmí být záporné");
        }
        this.id = id;
        this.jmeno = jmeno;
        this.level = level;
        this.zakladniHP = zakladniHP;
        this.sila = sila;
        this.obratnost = obratnost;
        this.inteligence = inteligence;
        this.vydrz = vydrz;
        this.rasa = rasa;
    }
    // Veřejné metody (Gettery) pro bezpečné čtení dat zvenčí
    getId() { return this.id; }
    getJmeno() { return this.jmeno; }
    getLevel() { return this.level; }
    getZakladniHP() { return this.zakladniHP; }
    getRasa() { return this.rasa.nazev; }
    getSila() { return this.sila; }
    getObratnost() { return this.obratnost; }
    getInteligence() { return this.inteligence; }
    getVydrz() { return this.vydrz; }
    // Vrátí odpovídající emoji podle názvu povolání
    getIkona() {
        if (this.getPovolani() === "Válečník")
            return "🛡️";
        if (this.getPovolani() === "Mág")
            return "🔮";
        return "🏹";
    }
    // Výpis základních informací do konzole
    vypisInfo() {
        console.log(`Hrdina: ${this.jmeno} (${this.getPovolani()})`);
    }
}
// --- SPECIFICKÁ POVOLÁNÍ (POTOMCI) ---
// Třída Válečník se zaměřením na vysoké HP a sílu
class Valecnik extends Hrdina {
    constructor(id, jmeno, level, sila, obratnost, inteligence, vydrz, rasa) {
        super(id, jmeno, level, 500, sila, obratnost, inteligence, vydrz, rasa);
    }
    vypocitejFinalniHP() {
        return this.getZakladniHP() + this.vydrz * 50 + this.getLevel() * 25;
    }
    vypocitejFinalniPoskozeni() {
        return this.sila * 12 + this.getLevel() * 15;
    }
    getPovolani() { return "Válečník"; }
}
// Třída Mág se zaměřením na vysoké poškození z inteligence
class Mag extends Hrdina {
    constructor(id, jmeno, level, sila, obratnost, inteligence, vydrz, rasa) {
        super(id, jmeno, level, 250, sila, obratnost, inteligence, vydrz, rasa);
    }
    vypocitejFinalniHP() {
        return this.getZakladniHP() + this.vydrz * 28 + this.getLevel() * 18;
    }
    vypocitejFinalniPoskozeni() {
        return this.inteligence * 25 + this.getLevel() * 25;
    }
    getPovolani() { return "Mág"; }
}
// Třída Lukostřelec jako vyvážený střed s poškozením z obratnosti
class Lukostrelec extends Hrdina {
    constructor(id, jmeno, level, sila, obratnost, inteligence, vydrz, rasa) {
        super(id, jmeno, level, 350, sila, obratnost, inteligence, vydrz, rasa);
    }
    vypocitejFinalniHP() {
        return this.getZakladniHP() + this.vydrz * 35 + this.getLevel() * 20;
    }
    vypocitejFinalniPoskozeni() {
        return this.obratnost * 18 + this.getLevel() * 20;
    }
    getPovolani() { return "Lukostřelec"; }
}
// --- GLOBÁLNÍ STAV A PROMĚNNÉ APLIKACE ---
let parta = [];
let generatorId = 1;
const PovolaniVolby = [
    { typ: "valecnik", nazev: "Válečník", ikona: "🛡️" },
    { typ: "mag", nazev: "Mág", ikona: "🔮" },
    { typ: "lukostrelec", nazev: "Lukostřelec", ikona: "🏹" }
];
let indexPovolani = 0;
let vybranaRasa = Rasy[0];
let rucneRozdeleneBody = { sila: 0, obratnost: 0, inteligence: 0, vydrz: 0 };
let volneBody = 20;
// --- INICIALIZACE PO NAČTENÍ STRÁNKY ---
document.addEventListener("DOMContentLoaded", () => {
    // Otevření prázdného formuláře pro novou postavu
    document.getElementById("btn-jit-vytvorit").addEventListener("click", () => {
        document.getElementById("nadpis-formularu").textContent = "Nový hrdina";
        document.getElementById("editace-id").value = "";
        vynulujFormular();
        preklikniSekce(true);
        aktualizujSFPasPovolani();
    });
    // Tlačítko zpět do přehledu družiny
    document.getElementById("btn-zrusit-tvorbu").addEventListener("click", () => {
        preklikniSekce(false);
    });
    // Odeslání a zpracování formuláře
    document.getElementById("btn-ulozit-postavu").addEventListener("click", zpracujFormularHrdiny);
    // Prvotní vykreslení prvků na stránce
    generujAtributyUI();
    obnovWebovouDruzinu();
});
// Přepínání zobrazení mezi seznamem družiny a formulářem tvorby
function preklikniSekce(doFormulare) {
    if (doFormulare) {
        document.getElementById("sekce-druzina").classList.replace("block", "hidden");
        document.getElementById("sekce-tvorba").classList.replace("hidden", "block");
    }
    else {
        document.getElementById("sekce-tvorba").classList.replace("block", "hidden");
        document.getElementById("sekce-druzina").classList.replace("hidden", "block");
    }
}
// Správa animovaného kolotoče pro výběr povolání
function aktualizujSFPasPovolani() {
    const kontejner = document.getElementById("sf-pas-povolani");
    // Prvotní vytvoření tří fixních HTML slotů (tlačítek) v DOMu
    if (kontejner.children.length === 0) {
        for (let i = 0; i < 3; i++) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.id = `sf-slot-${i}`;
            btn.innerHTML = `
                <span id="sf-ikona-slot-${i}"></span>
                <span id="sf-nazev-slot-${i}"></span>
            `;
            kontejner.appendChild(btn);
        }
    }
    // Kruhová matematika pro zjištění indexů (střed, vlevo, vpravo)
    const stredIdx = indexPovolani;
    const vlevoIdx = (indexPovolani - 1 + PovolaniVolby.length) % PovolaniVolby.length;
    const vpravoIdx = (indexPovolani + 1) % PovolaniVolby.length;
    const pozice = [vlevoIdx, stredIdx, vpravoIdx];
    // Aktualizace textů a CSS stylů pro všechny 3 sloty podle jejich aktuální pozice
    pozice.forEach((povolaniIndex, slotId) => {
        const dataPovolani = PovolaniVolby[povolaniIndex];
        const btn = document.getElementById(`sf-slot-${slotId}`);
        const ikonaEl = document.getElementById(`sf-ikona-slot-${slotId}`);
        const nazevEl = document.getElementById(`sf-nazev-slot-${slotId}`);
        ikonaEl.textContent = dataPovolani.ikona;
        nazevEl.textContent = dataPovolani.nazev;
        let stylyTlacitka = "flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out transform outline-none focus:outline-none w-28 text-center gap-3 ";
        let stylyIkony = "filter transition-all duration-500 ease-in-out block leading-none ";
        let stylyNazvu = "font-bold uppercase tracking-wider transition-all duration-500 ease-in-out block truncate w-full leading-tight ";
        // Určení hodnoty posunu: slot 0 (vlevo) = -1, slot 1 (střed) = 0, slot 2 (vpravo) = +1
        const posun = slotId === 0 ? -1 : slotId === 2 ? 1 : 0;
        if (slotId === 1) {
            // Vizuální zvýraznění aktivního středového povolání
            stylyTlacitka += "z-10 scale-110 opacity-100";
            stylyIkony += "text-6xl scale-110 drop-shadow-[0_0_20px_rgba(245,158,11,0.7)]";
            stylyNazvu += "text-xs text-amber-400 font-black tracking-widest";
        }
        else {
            // Ztmavení a zmenšení bočních (neaktivních) prvků
            stylyTlacitka += "z-0 scale-90 opacity-40 hover:opacity-70";
            stylyIkony += "text-3xl grayscale blur-[0.3px]";
            stylyNazvu += "text-[9px] text-stone-500 font-medium";
        }
        btn.className = stylyTlacitka;
        ikonaEl.className = stylesCleanUp(stylyIkony);
        nazevEl.className = stylesCleanUp(stylyNazvu);
        // Klonování tlačítka pro bezpečné odstranění starých event listenerů
        const novyBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novyBtn, btn);
        // Přiřazení akce kliknutí pouze na krajní (posunové) sloty
        if (posun !== 0) {
            novyBtn.addEventListener("click", () => {
                indexPovolani = (indexPovolani + posun + PovolaniVolby.length) % PovolaniVolby.length;
                aktualizujSFPasPovolani();
            });
        }
    });
}
// Pomocná funkce pro vyčištění přebytečných mezer v řetězcích CSS tříd
function stylesCleanUp(str) {
    return str.trim().replace(/\s+/g, ' ');
}
// Resetování stavu formuláře do výchozích hodnot
function vynulujFormular() {
    volneBody = 20;
    rucneRozdeleneBody = { sila: 0, obratnost: 0, inteligence: 0, vydrz: 0 };
    vybranaRasa = Rasy[0];
    indexPovolani = 0;
    document.getElementById("vstup-jmeno").value = "";
    document.getElementById("vstup-level").value = "1";
    generujRasyUI();
    obnovCislaBoduUI();
    aktualizujSFPasPovolani();
}
// Generování tlačítek pro výběr rasy včetně zobrazení jejich statických bonusů
function generujRasyUI() {
    const grid = document.getElementById("vyber-rasy-grid");
    grid.innerHTML = "";
    Rasy.forEach(rasa => {
        const aktivni = rasa.nazev === vybranaRasa.nazev;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${aktivni ? 'bg-amber-600/20 border-amber-500 text-amber-400 font-bold shadow-lg' : 'bg-stone-950 border-stone-800 text-stone-400'}`;
        const f = (num) => num >= 0 ? `+${num}` : num.toString();
        btn.innerHTML = `
            <div class="text-sm font-bold text-white border-b border-stone-800 pb-1 mb-1 text-center sm:text-left">${rasa.nazev}</div>
            <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-stone-400 font-mono">
                <div>Síla: <span class="${rasa.bonusSila > 0 ? 'text-green-500' : rasa.bonusSila < 0 ? 'text-red-500' : ''}">${f(rasa.bonusSila)}</span></div>
                <div>Obrat: <span class="${rasa.bonusObratnost > 0 ? 'text-green-500' : rasa.bonusObratnost < 0 ? 'text-red-500' : ''}">${f(rasa.bonusObratnost)}</span></div>
                <div>Intel: <span class="${rasa.bonusInteligence > 0 ? 'text-green-500' : rasa.bonusInteligence < 0 ? 'text-red-500' : ''}">${f(rasa.bonusInteligence)}</span></div>
                <div>Výdrž: <span class="${rasa.bonusVydrz > 0 ? 'text-green-500' : rasa.bonusVydrz < 0 ? 'text-red-500' : ''}">${f(rasa.bonusVydrz)}</span></div>
            </div>
        `;
        btn.addEventListener("click", () => { vybranaRasa = rasa; generujRasyUI(); obnovCislaBoduUI(); });
        grid.appendChild(btn);
    });
}
// Generování ovládacích prvků (tlačítek + a -) pro rozdělování bodů atributů
function generujAtributyUI() {
    const seznam = document.getElementById("atributy-ovladani");
    seznam.innerHTML = "";
    const popisky = { sila: "💪 Síla (Válečník)", obratnost: "🏹 Obratnost (Lukostřelec)", inteligence: "🔮 Inteligence (Mág)", vydrz: "❤️ Výdrž (Životy)" };
    ["sila", "obratnost", "inteligence", "vydrz"].forEach(klic => {
        const radek = document.createElement("li");
        radek.className = "flex justify-between items-center bg-stone-900/40 p-2 rounded-lg border border-stone-900 list-none";
        radek.innerHTML = `
            <span class="text-stone-300 text-xs font-medium">${popisky[klic]}</span>
            <div class="flex items-center gap-3">
                <button type="button" class="w-8 h-8 bg-stone-900 hover:bg-stone-800 text-red-500 font-bold rounded cursor-pointer select-none disabled:opacity-30" id="btn-minus-${klic}">-</button>
                <span id="cislo-${klic}" class="text-white font-bold font-mono w-6 text-center">5</span>
                <button type="button" class="w-8 h-8 bg-stone-900 hover:bg-stone-800 text-green-500 font-bold rounded cursor-pointer select-none disabled:opacity-30" id="btn-plus-${klic}">+</button>
            </div>
        `;
        seznam.appendChild(radek);
        document.getElementById(`btn-minus-${klic}`).addEventListener("click", () => upravAtribut(klic, -1));
        document.getElementById(`btn-plus-${klic}`).addEventListener("click", () => upravAtribut(klic, 1));
    });
}
// Změna stavu bodů v paměti (přičtení / odečtení volného bodu)
function upravAtribut(klic, zmena) {
    if (zmena > 0 && volneBody > 0) {
        rucneRozdeleneBody[klic]++;
        volneBody--;
    }
    else if (zmena < 0 && rucneRozdeleneBody[klic] > 0) {
        rucneRozdeleneBody[klic]--;
        volneBody++;
    }
    obnovCislaBoduUI();
}
// Výpočet celkových statů (Základ + Kliknuto + Rasový bonus) a přepínání dostupnosti tlačítek
function obnovCislaBoduUI() {
    document.getElementById("volne-body").textContent = volneBody.toString();
    const mapovaniBonusu = {
        sila: vybranaRasa.bonusSila,
        obratnost: vybranaRasa.bonusObratnost,
        inteligence: vybranaRasa.bonusInteligence,
        vydrz: vybranaRasa.bonusVydrz
    };
    for (let klic in rucneRozdeleneBody) {
        const rucnePridano = rucneRozdeleneBody[klic];
        const bonusRasy = mapovaniBonusu[klic];
        const finalniZobrazenyStat = 5 + rucnePridano + bonusRasy;
        document.getElementById(`cislo-${klic}`).textContent = finalniZobrazenyStat.toString();
        // Zamezení klikání do záporu nebo nad limit volných bodů
        document.getElementById(`btn-minus-${klic}`).disabled = rucnePridano <= 0;
        document.getElementById(`btn-plus-${klic}`).disabled = volneBody <= 0;
    }
}
// Načtení dat stávajícího hrdiny zpět do formuláře za účelem jeho úpravy
function otevriEditaciHrdiny(id) {
    const hrdina = parta.find(h => h.getId() === id);
    if (!hrdina)
        return;
    document.getElementById("nadpis-formularu").textContent = `Úprava hrdiny: ${hrdina.getJmeno()}`;
    document.getElementById("editace-id").value = id.toString();
    document.getElementById("vstup-jmeno").value = hrdina.getJmeno();
    document.getElementById("vstup-level").value = hrdina.getLevel().toString();
    const pIndex = PovolaniVolby.findIndex(p => p.nazev === hrdina.getPovolani());
    indexPovolani = pIndex !== -1 ? pIndex : 0;
    const nalezenaRasa = Rasy.find(r => r.nazev === hrdina.getRasa());
    vybranaRasa = nalezenaRasa || Rasy[0];
    generujRasyUI();
    // Zpětný dopočet čistě uživatelem rozdělených bodů (odpočet základu 5 a rasy)
    rucneRozdeleneBody = {
        sila: hrdina.getSila() - 5 - vybranaRasa.bonusSila,
        obratnost: hrdina.getObratnost() - 5 - vybranaRasa.bonusObratnost,
        inteligence: hrdina.getInteligence() - 5 - vybranaRasa.bonusInteligence,
        vydrz: hrdina.getVydrz() - 5 - vybranaRasa.bonusVydrz
    };
    const utraceno = rucneRozdeleneBody.sila + rucneRozdeleneBody.obratnost + rucneRozdeleneBody.inteligence + rucneRozdeleneBody.vydrz;
    volneBody = 20 - utraceno;
    obnovCislaBoduUI();
    preklikniSekce(true);
    aktualizujSFPasPovolani();
}
// Smazání hrdiny z pole na základě indexu a překreslení seznamu
function smazHrdinu(id) {
    const index = parta.findIndex(h => h.getId() === id);
    if (index !== -1) {
        parta.splice(index, 1);
        obnovWebovouDruzinu();
    }
}
// Zpracování dat z formuláře, vytvoření/úprava instance třídy a uložení do pole
function zpracujFormularHrdiny() {
    const jmeno = document.getElementById("vstup-jmeno").value.trim();
    const level = parseInt(document.getElementById("vstup-level").value) || 0;
    const editIdStr = document.getElementById("editace-id").value;
    // Validace kompletnosti formuláře před uložením
    if (!jmeno)
        return alert("⚠️ Jméno nesmí být prázdné!");
    if (level < 1)
        return alert("⚠️ Level musí být alespoň 1!");
    if (volneBody > 0)
        return alert(`⚠️ Musíš rozdělit ještě ${volneBody} zbývajících bodů!`);
    const typ = PovolaniVolby[indexPovolani].typ;
    let hrdina;
    let targetId = editIdStr ? parseInt(editIdStr) : generatorId++;
    const finalSila = 5 + rucneRozdeleneBody.sila + vybranaRasa.bonusSila;
    const finalObrat = 5 + rucneRozdeleneBody.obratnost + vybranaRasa.bonusObratnost;
    const finalIntel = 5 + rucneRozdeleneBody.inteligence + vybranaRasa.bonusInteligence;
    const finalVydrz = 5 + rucneRozdeleneBody.vydrz + vybranaRasa.bonusVydrz;
    // Větvení tvorby instancí podle vybraného typu povolání
    if (typ === "valecnik") {
        hrdina = new Valecnik(targetId, jmeno, level, finalSila, finalObrat, finalIntel, finalVydrz, vybranaRasa);
    }
    else if (typ === "mag") {
        hrdina = new Mag(targetId, jmeno, level, finalSila, finalObrat, finalIntel, finalVydrz, vybranaRasa);
    }
    else {
        hrdina = new Lukostrelec(targetId, jmeno, level, finalSila, finalObrat, finalIntel, finalVydrz, vybranaRasa);
    }
    // Zápis hrdiny: buď přepis existujícího indexu při editaci, nebo vložení nového (push)
    if (editIdStr) {
        const index = parta.findIndex(h => h.getId() === targetId);
        if (index !== -1)
            parta[index] = hrdina;
    }
    else {
        parta.push(hrdina);
    }
    preklikniSekce(false);
    obnovWebovouDruzinu();
}
// Vykreslení grafických karet všech hrdinů z pole do přehledové mřížky v HTML
function obnovWebovouDruzinu() {
    const kont = document.getElementById("kontejner-postav");
    kont.innerHTML = "";
    // Zobrazení prázdného stavu, pokud v družině nikdo není
    if (parta.length === 0) {
        kont.innerHTML = `
            <article class="col-span-full text-center py-12 bg-stone-900/30 rounded-xl border-2 border-dashed border-stone-800/60 p-6">
                <h3 class="text-stone-400 text-lg font-medium">Seznam hrdinů je momentálně prázdný.</h3>
                <p class="text-amber-500/60 text-sm mt-1">Klikněte na tlačítko výše a vytvořte svého prvního hrdinu!</p>
            </article>`;
        document.getElementById("souhrn-druziny").classList.add("hidden");
        return;
    }
    let celkovyUtokWeb = 0;
    let celkovaHPWeb = 0;
    // Cyklické sestavení HTML struktury karet hrdinů včetně výpočtu celkových týmových statistik
    parta.forEach(h => {
        const finalHP = h.vypocitejFinalniHP();
        const finalDMG = h.vypocitejFinalniPoskozeni();
        celkovaHPWeb += finalHP;
        celkovyUtokWeb += finalDMG;
        const karta = document.createElement("article");
        karta.className = "bg-stone-900 border border-amber-950/50 p-5 rounded-xl relative overflow-hidden shadow-md flex flex-col justify-between";
        karta.innerHTML = `
            <div>
                <div class="absolute right-2 top-2 text-5xl opacity-10 pointer-events-none select-none">${h.getIkona()}</div>
                <header class="text-[10px] text-amber-400 font-bold uppercase tracking-wide bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded inline-block">
                    ${h.getPovolani()} • ${h.getRasa()}
                </header>
                <h3 class="text-xl font-bold text-white mt-2 truncate">${h.getJmeno()} (Lvl ${h.getLevel()})</h3>
                
                <ul class="mt-3 space-y-0.5 text-[11px] font-mono text-stone-400 list-none p-0">
                    <li>Síla: ${h.getSila()} | Obratnost: ${h.getObratnost()}</li>
                    <li>Intel: ${h.getInteligence()} | Výdrž: ${h.getVydrz()}</li>
                </ul>

                <section class="mt-3 pt-3 border-t border-stone-800/80 space-y-1 text-sm font-medium">
                    <div class="flex justify-between">
                        <span class="text-stone-400 text-xs">❤️ Životy:</span>
                        <strong class="font-bold text-red-500 font-mono">${finalHP} HP</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400 text-xs">⚔️ Poškození:</span>
                        <strong class="font-bold text-orange-400 font-mono">${finalDMG} DMG</strong>
                    </div>
                </section>
            </div>
            
            <footer class="mt-4 pt-2 flex gap-2">
                <button type="button" class="flex-1 bg-stone-950 hover:bg-amber-600/10 border border-amber-900/40 hover:border-amber-500 text-amber-400 text-xs font-bold py-2 rounded-lg cursor-pointer transition" id="btn-edit-${h.getId()}">
                    ✏️ Upravit
                </button>
                <button type="button" class="bg-red-950/40 hover:bg-red-600 border border-red-900/40 hover:border-red-500 text-red-400 hover:text-white text-xs font-bold py-2 px-3 rounded-lg cursor-pointer transition" id="btn-del-${h.getId()}">
                    🗑️ Smazat
                </button>
            </footer>
        `;
        kont.appendChild(karta);
        // Navázání obslužných funkcí na dynamicky vygenerovaná tlačítka karet hrdinů
        document.getElementById(`btn-edit-${h.getId()}`).addEventListener("click", () => otevriEditaciHrdiny(h.getId()));
        document.getElementById(`btn-del-${h.getId()}`).addEventListener("click", () => smazHrdinu(h.getId()));
    });
    // Zobrazení a aktualizace celkového souhrnného panelu statistik družiny
    document.getElementById("celkova-hp").textContent = celkovaHPWeb + " HP";
    document.getElementById("celkovy-utok").textContent = celkovyUtokWeb + " DMG";
    document.getElementById("souhrn-druziny").classList.remove("hidden");
}
