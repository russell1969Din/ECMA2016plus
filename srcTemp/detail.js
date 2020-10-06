import {DBMySQL} from "../srcRoot/mySQL.js";

export class Detail {
    constructor() {}

    controller() {
        let otherParams = [{'pathJSON': 'json/', 'methodName':'bigImage', 'fadeIn':0, 'tester':true, 'noCache':true}];    
        let dbMySQL = new DBMySQL( 'general', otherParams );  
         
        let container = {};  
        container = [{  'type':'div', 
                        'id':'image', 
                        'parentId':'bigImage',
                        'pathImage':'img/',
                        'callTemplate':''}];
        dbMySQL.read(container, 0, 'gen_unique="' + getFragmentPath(2) + '"');
    }
}
