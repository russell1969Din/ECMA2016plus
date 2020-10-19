import {System} from "../../srcRoot/system.js";
import {DBController} from "../../srcRoot/dbController.js";
import {StdElement} from "../../srcLibrary/stdElement.js";

export class VlozteDopyt {

    constructor() {}

    renderTemplate() {

        let system = new System();
        system.cssFileRead('srcTemp/vlozte-dopyt', 'vlozte-dopyt'); //, '', true

        
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};
        let dbController = new DBController(    'general',
                                                otherParams);

        let container = {   'parentID':'vlozte-dopyt-workbanch',
                            'ID':'vlozte-dopyt-1',
                            'cssFile':'comingSoon.css',
                            'imgPath':'',
                            'cssGlobal':'CSGlobal',
                            'cssCnt':'CSElement',
                            'cnt1': 'Prístupné zanedlho...<br />(Vložte dopyt)',
                            'BS1': ''};
        dbController.read(new StdElement(), container);
    }
}

