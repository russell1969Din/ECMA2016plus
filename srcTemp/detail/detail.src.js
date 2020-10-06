import {DBMySQL} from "../../srcRoot/mySQL.js";
import {FillContainers} from "../../srcContents/fillContainers.js";

export class Detail {
    constructor() {}

    controller() {
        let otherParams = [{'pathJSON': 'json/', 'tester':true, 'noCache':true}];    
        let dbMySQL = new DBMySQL( 'general', otherParams );  
         
        let container = {};  
        container = [{  'methodName':'bigImage', 
                        'type':'div', 
                        'id':'image', 
                        'parentId':'bigImage',
                        'pathImage':'../img/',
                        'fadeIn':0, 
                        'callTemplate':''}];
        dbMySQL.read(container, 0, 'gen_unique="' + getFragmentPath(2) + '"');
        
        container = [{  'methodName':'insertTextOnly', 
                        'type':'div', 
                        'id':'text_1',
                        'fadeIn':0,  
                        'parentId':'textNote',
                        'usingFields': {'fieldName': 'gen_note', 'title':'POPIS:'},
                        }];        
       dbMySQL.read(container, 0, 'gen_unique="' + getFragmentPath(2) + '"');

        container = [{  'methodName':'insertTextOnly', 
                        'type':'div', 
                        'id':'text_2',
                        'fadeIn':0,  
                        'parentId':'textArea',
                        'usingFields': {'fieldName': 'gen_area', 'title':'OKOLIE:'},
                        }];        
       dbMySQL.read(container, 0, 'gen_unique="' + getFragmentPath(2) + '"');

    }
}
