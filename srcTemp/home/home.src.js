import {DBMySQL} from "../../srcRoot/mySQL.js";
import {DomLevels} from "../../srcRoot/domLevels.js";
import {System} from "../../srcRoot/system.js";
import {Detail} from "../detail/detail.src.js";

export class Home {
    constructor() {
        this.viewFields = [
                {
                    'field':'gen_top',
                    'title':'Top nehuteľnosť',
                    'iconFont':'fas fa-thumbs-up',
                    'iconColor':'#fff',
                    'iconBgColor':'#b3428f'
                },
                {
                    'field':'gen_new',
                    'title':'Novinka v ponuke',
                    'iconFont':'far fa-star',
                    'iconColor':'#fff',
                    'iconBgColor':'#be0a0b'
                },
                {
                    'field':'gen_exclusiv',
                    'title':'Exkluzívna ponuka',
                    'iconFont':'fas fa-sun',
                    'iconColor':'#fff',
                    'iconBgColor':'#015c5a'
                },
                {
                    'field':'gen_reserve',
                    'title':'Rezervované',
                    'iconFont':'fas fa-user-lock',
                    'iconColor':'#fff',
                    'iconBgColor':'#515151'
                },
                {
                    'field':'gen_discount',
                    'title':'Zľava na cene',
                    'iconFont':'fas fa-percent',
                    'iconColor':'#fff',
                    'iconBgColor':'#247b22'
                },
                {
                    'field':'gen_centre',
                    'title':'Priamo v centre',
                    'iconFont':'',
                    'iconColor':'',
                    'iconBgColor':''
                },
                {
                    'field':'gen_title',
                },
                {
                    'field':'gen_unique',
                } ,
                {
                    'field':'gen_id',
                },    
                {
                    'field':'cat_note',
                    'title':'Kategória:',
                },    
                {
                    'field':'typ_note',
                    'title':'Druh:',
                },
                {
                    'field':'gen_price',
                    'title':'Cena:',
                }                              
        ];
    }

    controller() {
        let otherParams = [{'pathJSON': 'json/', 'tester':true, 'noCache':true}];    
        let dbMySQL = new DBMySQL(  'general~category~types', 
                                    otherParams, 
                                    'gen_category=cat_id && gen_type = typ_id' );

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
    
    dataEstate( data,
                viewFields,
                parentID, 
                containerType, 
                containerID, 
                tester,
                callTemplate) {

        let detail = new Detail();
        let domLevels = new DomLevels();
        let icons = domLevels.createElement(    parentID,
                                                containerType,
                                                containerID,
                                                tester);
        
        let system = new System();
        let fromDB = system.getArrayFromData(this.viewFields, data);

        let html = '';        
        for(let icons of this.viewFields) { 
            if(typeof icons.iconFont != 'undefined') {
                if(icons.iconFont.length>0 && fromDB[icons.field] == 1) {
                    html += '<i title="' + icons.title + '" style="color:' + icons.iconColor + ';background-color:' + icons.iconBgColor + ';" class="icon ' + icons.iconFont + '"></i>';
                }
            }
        }
        $('#'+containerID).append(html);
        
        console.log(data['gen_centre']);
        if(data['gen_centre']==1) {
            $('#'+containerID).append('<div id="click_1_'+data['gen_id']+'" class="centre"><p class="centreSpan">&nbsp;Priamo&nbsp;v&nbsp;centre&nbsp;</p></div>');
            $('#'+'click_1_'+data['gen_id']).unbind();
            $('#'+'click_1_'+data['gen_id']).click(function() {
                let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
                domLevels.linkTemplate(hrefLink, $('#webURL').html());
                let detail = new Detail();
                detail.controller();
            });
        } else {$('#'+containerID).append('<div class="centre"></div>');}

        $('#'+containerID).append('<div id="click_2_'+data['gen_id']+'" class="titleEstate">' + fromDB['gen_title'].substr(0,60) + '...</div>');
        $('#'+'click_2_'+data['gen_id']).unbind();
        $('#'+'click_2_'+data['gen_id']).click(function() {
            let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
            domLevels.linkTemplate(hrefLink, $('#webURL').html());
            let detail = new Detail();
            detail.controller();
        });
        
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['cat_noteTitle'] + '</div><div class="valueEstate">' + fromDB['cat_note'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['typ_noteTitle'] + '</div><div class="valueEstate">' + fromDB['typ_note'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">Obec:</div><div class="valueEstate github">Použijeme JSON github</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">Kraj:</div><div class="valueEstate github">Použijeme JSON github</div></div>');
        $('#'+containerID).append('<div class="lineEstate margin"></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['gen_priceTitle'] + '</div><div class="valueEstate price">' + fromDB['gen_price'] + '</div></div>');
        
        $('#'+containerID).append('<div id="click_3_'+data['gen_id']+'"  class="linkDetail d-flex justify-content-center"><div class="linkDetailIn">Detail</div></div>');
        $('#'+'click_3_'+data['gen_id']).unbind();
        $('#'+'click_3_'+data['gen_id']).click(function() {
            let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
            domLevels.linkTemplate(hrefLink, $('#webURL').html());
            let detail = new Detail();
            detail.controller();
        });

    }
}
