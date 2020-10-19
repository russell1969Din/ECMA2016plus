import {DomLevels} from "../srcRoot/domLevels.js";
import {MenuControl} from "../srcRoot/menuControl.js";
import {System} from "../srcRoot/system.js";


export class StdElement {

    constructor(data={}, container={}, otherParams={}) {
        //  container       parameters
        //  parentID        ID rodičovského kontajnera v šablóne
        //  ID              ID globálneho kontajnera používaný metódou triedy
        //  cssFile         Možnosť nahrať prívátnu CSS šablónu z priečinka css-user
        //  imgPath         Priečinok v ktorom sa majú nachádzať použité obrázky
        //  cssGlobal       Názov globálnej CSS triedy ako ju má používať táto metóda triedy
        //  cssCnt          Príznak názvu CSS triedy pre každý ďalší vložený element ++index (napr. cssCnt-1)
        //  cnt(1, 2...)    Obsah kontajnera
        //                  Ak metóda  execRender zistí že sa jedná o položku db tabuľky, načíta obsah tejto položky
        //                  Ak metóda  execRender zistí že sa jedná o obrázok, zobrazí obrázok ak existuje
        //  cnt1 cnt2       Každý obsah bude použitý pre príslušný kontajner. cnt3 neexistuje - execRender ukončí činnosť
        // BS2 BS3          Pre príslušný kontajner možnosť použiť CSS triedy z knižnice Bootstrap 
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
                .then(result => this.test = this.contentIntro(data, container, otherParams, result)); 
        } else {
            this.contentIntro(data, container, otherParams, {})
        }
    }
    
    contentIntro(data={}, container={}, otherParams={}, jsonData={}) {

        let system = new System();
        system.cssFileRead('srcLibrary', 'stdElement', this.cssFile ); 

        let domLevels = new DomLevels();

        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);   
        if(typeof this.cssGlobal != 'undefined') $('#'+this.ID).addClass(this.cssGlobal);

        
        let imgPath = '';
        if(typeof this.imgPath != 'undefined') imgPath = this.imgPath;
        
        let exist;
        let content;
        let lineID;
        for(let index=1;index<10;++index) {
            eval('exist = typeof this.cnt'+index+'!="undefined"');
            if(!exist) break;
            eval('content = this.cnt'+index);
            lineID = this.ID + '-' + index;
            let cnt = domLevels.createDivElement(   this.ID,
                                                    lineID, 
                                                    this.tester);    
            
            let isBS =false;
            eval('isBS = typeof this.BS'+index+'!="undefined"');
            let bootstrap = '';
            if(isBS) eval('bootstrap = this.BS'+index);
            let addClass = this.cssCnt+' ' + bootstrap + ' '+this.cssCnt+'-'+index;
            $('#'+lineID).addClass(addClass);

            if(Object.keys(data).length > 0) {
                if(typeof this.data[0][content]!='undefined') {content = this.data[0][content];}
            }

            content = this.getIfJSON(content, jsonData);
            content = this.getIfImage(content, imgPath);
            content = this.getIfVideoPreview(content, lineID);

            $('#'+lineID).html(content);    //' ( ' + addClass + ' ) ' + 
        }
    }
    

    
    getIfVideoPreview(content='', lineID) {
    
        let system = new System();
        
        
        if(system.isFileNameWithVideoFormat(content)) {
            let HTML = '<div id="' + lineID + '-video" class="container d-flex justify-content-center living-of-video">';
            // to do living-of-frame
            HTML += '<iframe id="video-preview" class="living-of-frame" align="center" src="'+ content +'" frameborder="0" allowfullscreen=""></iframe>';
            HTML += '</div>';
            content = HTML;
        }
        return content;
    }
    
    
    getIfJSON(content='',jsonData={}) {
        
        if(content == $('#tableFromJSON').html()) {
            if(Object.keys(jsonData).length==0) return 'Chýba JSON predloha zobrazenia !';
            return this.renderTable(jsonData);
        } else {
            return content;
        }
    }
    
    renderTable(jsonData={}) {

        //  CSS table
        //  element-table       CSS trieda použitá pre globálny kontajner tabuľky
        //  in-line-table       CSS trieda použitá pre všetky riadky v tabuľke
        //  in-line-table       CSS trieda použitá pre všetky riadky v tabuľke
        //  left-col-table      CSS trieda použitá pre bunky v ľavom sĺpci riadku
        //  right-col-table     CSS trieda použitá pre bunky v pravom sĺpci riadku
        
        //  living-of-video 
        //  living-of-frame 

        let system = new System();      
        let aFromDB = system.getArrayFromData(jsonData, this.data[0]);

        let columns = this.columns;

        if(columns<1) columns = 1;
        if(columns==5 || columns>6) columns = 6;
        
        let record;
        let HTML = '';
        let index = 1;
        HTML += '<div class="row element-table">'; //row-in-table row-in-table-start
        
        let execBreak = false;
        
        while(index<1000) {
            for(let x=1;x<=columns;++x) {
                HTML += '<div class="col-sm-4  in-line-table">'; //col-in-table
                    record = system.getRecordFromIndex(aFromDB, index); ++index;
                    if(record==null) {execBreak = true; break;}
                    
                    HTML += '<div class="left-col-table" >'; //col-in-table-left
                        HTML += record[record['fieldName']+'Title'];
                    HTML += '</div>';
                    HTML += '<div class="right-col-table" >';  /// border-right col-in-table-right
                    if(record[record['fieldName']+'Logical'] == 0) {
                        HTML += record[record['fieldName']];
                    } else {
                        if(record[record['fieldName']] == 1) HTML += this.isTrue; else HTML += this.isFalse;
                    }
                    HTML += '</div>';
                HTML += '</div>';
            }
            if(execBreak) break;
        }
        HTML += '</div>';
        HTML += '</div>';        
        return HTML;
    }

    getIfImage(content='', imgPath='') {                                
        if(content.trim().length == 0) return content;
        let dot = content.lastIndexOf('.');
        let length = content.length;
        if(dot != (length-4) && dot != (length-5)) return content;
        
        let aExtension = ['.jpg', '.jpeg', '.gif', '.tiff', '.bmp', '.png'];
        for(let ext of Object.values(aExtension)) {
            if(content.toLowerCase().indexOf(ext)!=(-1)) {
                if(content.toLowerCase().indexOf(ext) == content.length - (ext.length)) {
                    content = '<img src="'+$('#webURL').html() + imgPath + '/' + content+'" />';
                }
            }
        }    
        return content;
    }
}
