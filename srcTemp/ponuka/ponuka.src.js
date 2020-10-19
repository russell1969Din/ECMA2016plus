import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";
import {StdElement} from "../../srcLibrary/stdElement.js";

export class Ponuka {

    constructor() {}
    
    renderTemplate() {

        let system = new System();
        system.cssFileRead('srcTemp/ponuka', 'ponuka'); //, '', true
        
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};    
        let dbController = new DBController(    'general',
                                                otherParams);

        let container = {   'parentID':'ponuka-workbanch',
                            'ID':'ponuka-1',
                            'cssFile':'comingSoon.css',
                            'imgPath':'',
                            'cssGlobal':'CSGlobal',
                            'cssCnt':'CSElement',
                            'cnt1': 'Prístupné zanedlho....<br/>(Ponuka)',
                            'BS1': ''};
        dbController.read(new StdElement(), container);
    }
}
