import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";
import {StdElement} from "../../srcLibrary/stdElement.js";

export class OSpolocnosti {

    constructor() {}

    renderTemplate() {

        let system = new System();
        system.cssFileRead('srcTemp/o-spolocnosti', 'o-spolocnosti'); //, '', true
        
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};
        let dbController = new DBController(    'general',
                                                otherParams);
                                                
        let container = {   'parentID':'o-spolocnosti-workbanch',
                            'ID':'o-spolocnosti-1',
                            'cssFile':'comingSoon.css',
                            'imgPath':'',
                            'cssGlobal':'CSGlobal',
                            'cssCnt':'CSElement',
                            'cnt1': 'Prístupné zanedlho...<br />(O spoločnosti)',
                            'BS1': ''};
        dbController.read(new StdElement(), container);
    }
}
