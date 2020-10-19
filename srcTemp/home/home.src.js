
import {DBController} from "../../srcRoot/dbController.js";

import {ListItems} from "../../srcLibrary/listItems.js";

import {StdElement} from "../../srcLibrary/stdElement.js";
export class Home {
    constructor() {}

    renderTemplate() {
        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};    
        let dbController = new DBController(    'general~category~types~villages~districts~regions~parking~conditions',   //
                                                otherParams, //   ''       
                                                'gen_category=cat_id && gen_type=typ_id && gen_village=vil_id && gen_district=dis_id && gen_region=reg_id && gen_parking = par_id && gen_condition=con_id');  

        let container;
/*        
        let elem = '';
        let elem1 = 'Lorem ipsum dolor sit amet consectetuer risus orci Pellentesque et lorem. Aenean sed pretium adipiscing massa nascetur Cras Curabitur ut lacinia ante. Quis id dolor justo libero tellus at non pede id nec. In elit et elit id neque Aliquam Phasellus ligula pretium adipiscing. Fringilla nibh Nulla nibh at id odio pellentesque at tortor In. Neque consequat. ';
        let elem2 = 'Neque orci adipiscing Maecenas quis sem fames nec porta ut tristique. Nibh nonummy vitae Sed gravida justo Maecenas metus ac hendrerit condimentum. Vel Lorem Lorem felis eu condimentum Vestibulum auctor magna penatibus porttitor. Tortor tristique Phasellus metus Nulla sem a Curabitur Nulla neque enim. Odio tortor Nulla consequat vitae consequat dui Quisque Vestibulum Aenean molestie. Aliquam vitae justo fermentum nisl Aliquam Duis. ';
        let elem3 = 'Habitasse feugiat nisl ut dui eleifend pellentesque libero cursus Phasellus sed. Ut penatibus urna quis Donec at et pretium Integer nibh et. Vitae id penatibus orci eu eros ligula et quis id neque. Tortor egestas Morbi ac lacinia vel condimentum quis molestie et In. Nam id lacinia congue et Morbi. ';


        

        container = {   'parentID':'elementAndJSON',
                        'ID':'elemJSON',
                        'cssFile':'estate-JSON',
                        'jsonFile':'../jsonStructInfo/dataEstateDetailPlus.json',
                        'isTrue':'Áno',
                        'isFalse':'Nie',
                        'columns':3,
                        'fadeIn':1000,
                        'imgPath':'',
                        'cssGlobal':'jsonGlobal container',
                        'cssCnt':'jsonElement',
                        'cnt1': elem1,
                        'cnt2': elem2,
                        'cnt3': 'tableFromJSON',
                        'cnt4': elem3,
                        'BS1': ''};
        dbController.read(new StdElement(), container, true, 2);


        
        container = {   'parentID':'stdElement',
                        'ID':'element0',
                        'cssFile':'',
                        'imgPath':'/imgStatic',
                        'cssGlobal':'cssGlobal container',
                        'cssCnt':'cssElement',
                        'cnt1': elem1,
                        'cnt2': 'gen_area',
                        'cnt3': elem3,
                        'BS2': 'border',
                        'cnt4': 'logo.jpg',
                        'BS4': 'd-flex justify-content-center',};
        dbController.read(new StdElement(), container, true, 2);


        container = {   'parentID':'stdElement1',
                        'ID':'element1',
                        'cssFile':'tester1.css',
                        'imgPath':'/imgStatic',
                        'cssGlobal':'firstGlobal container',
                        'cssCnt':'firstElement',
                        'cnt1': elem1,
                        'cnt2': 'gen_note',
                        'cnt3': elem3,
                        'BS2': 'border',
                        'cnt4': 'logo.jpg',
                        'BS4': 'd-flex justify-content-center',};
                        
        dbController.read(new StdElement(), container, true, 2);

        
        container = {   'parentID':'stdElement2',
                        'ID':'element2',
                        'cssFile':'tester2.css',
                        'imgPath':'/imgStatic',
                        'cssGlobal':'secondGlobal container',
                        'cssCnt':'secondElement',
                        'cnt1': elem1,
                        'cnt2': elem2,
                        'cnt3': elem3,
                        'BS2': 'border',
                        'cnt4': 'logo.jpg',
                        'BS4': 'd-flex justify-content-center',};
                        
        dbController.read(new StdElement(), container, true, 2);



        //let stdElement = new StdElement({}, container, otherParams);


        //stdElement.execRender();
         */

        let iconTitle = 'far fa-star';
        let methodName = 'listItems';
        container = {   'parentID':'workSpace01',
                        'ID':'tester', 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Top nehnuteľnosti', 
                        'type':'div', 
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'structJSON':{'json1': 'dataEstate'},
                        'viewFields':this.viewFields};
        dbController.read(new ListItems(), container, true);

        container = {   'parentID':'workSpace02',
                        'ID':'second', 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Najnovšie nehnuteľnosti',
                        'type':'div', 
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'structJSON':{'json1': 'dataEstate'},
                        'viewFields':this.viewFields};
        dbController.read(new ListItems(), container, true, 2);

        container = {   'parentID':'workSpace03',
                        'ID':'three', 
                        'columns':4,
                        'iconTitle':iconTitle,
                        'title':'Testovacia trojka',
                        'type':'div', 
                        'parentId':'workSpace03',
                        'pathImage':'img/',
                        'fadeIn':1000, 
                        'callTemplate':'detail',
                        'structJSON':{'json1': 'dataEstate'},
                        'viewFields':this.viewFields};
        dbController.read(new ListItems(), container, true, 3);    
    }
}
