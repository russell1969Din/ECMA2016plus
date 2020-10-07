import {DBMySQL} from "./mySQL.js";

export class System {
    constructor() {}
    
    //======    Met�da pre vytvorenie po�a s kl��mi pre v�ber d�t z tabu�ky (cez JSON)
    getArrayFromData(fieldsAndTitle, objData) {

        //======    Deklar�cia n�vratov�ho po�a
        let fromDB;
        //======    Deklar�cia ��sla riadku vo vyt�ranom poli
        let record   = 1; 
        //======    Pr�prava re�azca pre javascript evaluation
        let eCode   = 'fromDB = {';
        for(let dbField of Object.values(fieldsAndTitle) ) {
            //======    Do k���a key s ��slom riadku vlo�� n�zov po�a tabu�ky
            eCode       +=  '"key' + record + '": "' + dbField.field + '",';
            //======    Do k���a s n�zvom st�pca v tabu�ke vlo�� hodnotu tohto po�a z tabu�ky
            eCode       +=  '"' + dbField.field + '": objData.' + dbField.field + ',';
            //======    Ak m� hotnota v tabu�ke DB (JSON) titu�ku na��ta ju do kl��a s n�zvom st�pca v tabu�ke + Title
            eCode       +=  '"' + dbField.field + 'Title": "' + dbField.title + '",';
            //======    Inkrementuje ��slo riadku vo vyt�ranom poli
            ++record;
        }
        //======    Uzatv�ra re�azec pre javascript evaluation
        eCode       +=  '};';
        //======    Spust� javascript evaluation
        eval(eCode);    
        //======    Vr�ti vytvoren� pole s key..1, hotnotou a titulkou v r�mci z�znamov tohto po�a
        return fromDB;
    }
}
