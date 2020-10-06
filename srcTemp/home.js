import {DBMySQL} from "../srcRoot/mySQL.js";

export class Home {
constructor() {}

    controller() {
        let otherParams = [{'pathJSON': 'json/', 'methodName':'listItems', 'fadeIn':1000, 'tester':true, 'noCache':true}];    
        let dbMySQL = new DBMySQL( 'general', otherParams );

        let iconTitle = 'far fa-star';
        let container = [];

        container = [{  'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Top nehnuteľnosti', 
                        'type':'div', 
                        'id':'tester', 
                        'parentId':'workSpace01',
                        'pathImage':'img/',
                        'callTemplate':'detail'}];
        dbMySQL.read(container);

        container = [{  'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Najnovšie nehnuteľnosti',
                        'type':'div', 
                        'id':'second', 
                        'parentId':'workSpace02',
                        'pathImage':'img/',
                        'callTemplate':'detail'}];
        dbMySQL.read(container, 2);

        container = [{  'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Testovacia trojka',
                        'type':'div', 
                        'id':'three', 
                        'parentId':'workSpace03',
                        'pathImage':'img/',
                        'callTemplate':'detail'}];
        dbMySQL.read(container, 3);    
    }
}
