import {DBMySQL} from "./mySQL.js";

export class System {
    constructor() {}
    
    //======    Metóda pre vytvorenie poľa s klúčmi pre výber dát z tabuľky (cez JSON)
    getArrayFromData(fieldsAndTitle, objData) {

        //======    Deklarácia návratového poľa
        let fromDB;
        //======    Deklarácia čísla riadku vo vytáranom poli
        let record   = 1; 
        //======    Príprava reťazca pre javascript evaluation
        let eCode   = 'fromDB = {';
        for(let dbField of Object.values(fieldsAndTitle) ) {
            //console.log(dbField.field + ' :: ' + dbField.title);
            //======    Do kľúča key s číslom riadku vloží názov poľa tabuľky
            eCode       +=  '"key' + record + '": "' + dbField.field + '",';
            //======    Do kľúča s názvom stĺpca v tabuľke vloží hodnotu tohto poľa z tabuľky
            eCode       +=  '"' + dbField.field + '": objData.' + dbField.field + ',';
            //======    Ak má hotnota v tabuľke DB (JSON) tituľku načíta ju do klúča s názvom stĺpca v tabuľke + Title
            eCode       +=  '"' + dbField.field + 'Title": "' + dbField.title + '",';
            //======    Inkrementuje číslo riadku vo vytáranom poli
            ++record;
        }
        //======    Uzatvára reťazec pre javascript evaluation
        eCode       +=  '};';
        //======    Spustí javascript evaluation
        eval(eCode);    
        //======    Vráti vytvorené pole s key..1, hotnotou a titulkou v rámci záznamov tohto poľa
        return fromDB;
    }
}
