import {DBMySQL} from "../../srcRoot/mySQL.js";
//import {DomLevels} from "../../srcRoot/domLevels.js";
//import {System} from "../../srcRoot/system.js";


export class Home {
    constructor() {
    }

    controller() {
        let otherParams = [{'pathJSON': 'json/', 'tester':true, 'noCache':true}];    
        let dbMySQL = new DBMySQL(  'general~category~types~villages~districts~regions',
                                    otherParams, 
                                    'gen_category=cat_id && gen_type = typ_id && gen_village = vil_id && gen_district = dis_id && gen_region = reg_id' );

        let iconTitle = 'far fa-star';
        let container = [];
        let methodName = 'listItems';

        container = [{  'methodName': methodName, 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Top nehnuteľnosti', 
                        'type':'div', 
                        'id':'tester', 
                        'parentId':'workSpace01',
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'viewFields':this.viewFields}];
        dbMySQL.read(container);

        container = [{  'methodName': methodName, 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Najnovšie nehnuteľnosti',
                        'type':'div', 
                        'id':'second', 
                        'parentId':'workSpace02',
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'viewFields':this.viewFields}];
        dbMySQL.read(container, 2);

        container = [{  'methodName': methodName, 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Testovacia trojka',
                        'type':'div', 
                        'id':'three', 
                        'parentId':'workSpace03',
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'viewFields':this.viewFields}];
        dbMySQL.read(container, 3);    
    }
    

}
