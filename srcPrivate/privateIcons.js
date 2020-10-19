import {System} from "../srcRoot/system.js";
import {DomLevels} from "../srcRoot/domLevels.js";

export class PrivateIcons {

    constructor(data={}, container={}, otherParams={}) {
        this.doConstruct(data, container, otherParams);
    }
    
    doConstruct(data={}, container={}, otherParams={}) {
        this.data = data;
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) eval('this.' + key + ' = container.' + key + ';');
        }

        if( Object.keys(otherParams).length > 0) {
            for(let key of Object.keys(otherParams)) eval('this.' + key + ' = otherParams.' + key + ';');
        }
        this.container = container;
        this.otherParams = otherParams;
    }
    
    execRender(data={}, container={}, otherParams={}) {
    
        this.doConstruct(data, container, otherParams);
    
        let ext = '.json';
        let jsonFile = undefinedIs(this.jsonFile); 
        if(jsonFile.toLowerCase().indexOf(ext) == jsonFile.length - (ext.length)) {
            fetch(jsonFile)
                .then(response => response.json())
                .then(result => this.test = this.iconsIntro(data, container, otherParams, result)); 
        }        
        
    }
    
    iconsIntro(data={}, container={}, otherParams={}, jsonData={}) {

        let domLevels = new DomLevels();
        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester); 
    
        $('#'+this.ID).html(this.createHTMLIcons(this.data, jsonData));
    }
    
    createSimpleHTMLIcons(viewFields, fromDB) {
        let html = '';        
        for(let icon of viewFields) { 
            if(typeof icon.iconFont != 'undefined') {
                if(icon.iconFont.length>0 && fromDB[icon.field] == 1) {
                    html += '<i title="' + icon.title + '" style="color:' + icon.iconColor + ';background-color:' + icon.iconBgColor + ';" class="icon ' + icon.iconFont + '"></i>';
                }
            }
        }
        return html;    
    }
    
    
    createHTMLIcons(data={}, jsonData={}) {

        let system = new System(); 
        let currentRec = data[0];
        let aFromDB = system.getArrayFromData(jsonData, data[0]);   

        let tempData = [];
        for(let line of Object.values(jsonData)) {
            let iconFont = undefinedIs(line['iconFont']);
            if(iconFont.trim().length >0) {
                tempData.push({     'field':line['field'],
                                    'title':line['title'],
                                    'iconFont':line['iconFont'],
                                    'iconColor':line['iconColor'],
                                    'iconBgColor':line['iconBgColor']});
            }
        }

        let index = 1;
        let record;
        let HTML = '';
        while(index<1000) {
            record = system.getRecordFromIndex(aFromDB, index); ++index;
            if(record==null) {break;}
            
            for(let line of Object.values(tempData)) {
                if(line.field == record.fieldName) {
                    if(record[record.fieldName]==1) {
                        HTML += '<i     title="' + line.title;
                        HTML += '" style="color:' + line.iconColor + ';background-color:' + line.iconBgColor + ';" ';
                        HTML += ' class="icon ' + line.iconFont + '" ></i>';
                    }
                }
            }
        }
        return HTML;
    }
}
