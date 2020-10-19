import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";
import {StdElement} from "../../srcLibrary/stdElement.js";

export class Kontakt {

    constructor() {}

    renderTemplate() {
    
        let system = new System();
        system.cssFileRead('srcTemp/kontakt', 'kontakt'); //, '', true    
        
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};
        let dbController = new DBController(    'general',
                                                otherParams);

        let container = {   'parentID':'kontakt-workbanch',
                            'ID':'kontakt-1',
                            'cssFile':'comingSoon.css',
                            'imgPath':'',
                            'cssGlobal':'CSGlobal',
                            'cssCnt':'CSElement',
                            'cnt1': 'Prístupné zanedlho...<br />(Kontakt)',
                            'BS1': ''};
        dbController.read(new StdElement(), container);
    }
}