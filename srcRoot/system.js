import {DBMySQL} from "./mySQL.js";

export class System {
    constructor() {}
    
    //======    MetÛda pre vytvorenie poæa s kl˙Ëmi pre v˝ber d·t z tabuæky (cez JSON)
    getArrayFromData(fieldsAndTitle, objData) {

        //======    Deklar·cia n·vratovÈho poæa
        let fromDB;
        //======    Deklar·cia ËÌsla riadku vo vyt·ranom poli
        let record   = 1; 
        //======    PrÌprava reùazca pre javascript evaluation
        let eCode   = 'fromDB = {';
        for(let dbField of Object.values(fieldsAndTitle) ) {
            //======    Do kæ˙Ëa key s ËÌslom riadku vloûÌ n·zov poæa tabuæky
            eCode       +=  '"key' + record + '": "' + dbField.field + '",';
            //======    Do kæ˙Ëa s n·zvom stÂpca v tabuæke vloûÌ hodnotu tohto poæa z tabuæky
            eCode       +=  '"' + dbField.field + '": objData.' + dbField.field + ',';
            //======    Ak m· hotnota v tabuæke DB (JSON) tituæku naËÌta ju do kl˙Ëa s n·zvom stÂpca v tabuæke + Title
            eCode       +=  '"' + dbField.field + 'Title": "' + dbField.title + '",';
            //======    Inkrementuje ËÌslo riadku vo vyt·ranom poli
            ++record;
        }
        //======    Uzatv·ra reùazec pre javascript evaluation
        eCode       +=  '};';
        //======    SpustÌ javascript evaluation
        eval(eCode);    
        //======    Vr·ti vytvorenÈ pole s key..1, hotnotou a titulkou v r·mci z·znamov tohto poæa
        return fromDB;
    }
}
