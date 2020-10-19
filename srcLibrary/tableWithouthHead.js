//======    Importuje triedu System s metódami systémovej podpory
import {System} from "../srcRoot/system.js";
import {DomLevels} from "../srcRoot/domLevels.js";
import {LibraryOther} from "../srcRoot/libraryOther.js";


//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/tableWithouthHead.css" />');     
    //  CSS current template
    //======    .row-in-table-start
    //======    .row-in-table
    //======    .col-in-table
    //======    .col-in-table-left
    //======    .col-in-table-right
    //======    .border-right

export class TableWithouthHead {

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
    }

    
   execRender(data={}, container={}, otherParams={}) {
    
        this.doConstruct(data, container, otherParams);

        let url = '../../jsonStructInfo/' + this.structJSON.json1 + '.json';    
        fetch(url)
            .then(response => response.json())
            .then(result => this.tableWithouthHead(result));        

    }
    
    tableWithouthHead(viewFields) {

        let data = this.data[0];

        let system = new System();
        let aFromDB = system.getArrayFromData(viewFields, this.data[0]);
        
        let columns = this.columns;
        if(columns<1) columns = 1;
        if(columns==5 || columns>6) columns = 6;
        
        let domLevels = new DomLevels();
        
        
        let ico = domLevels.createDivElement(   this.parentID,
                                                this.ID + '_icons',
                                                this.tester);
        
        let libraryOther = new LibraryOther();
        let html = libraryOther.iconsProcessing(viewFields, aFromDB); 
        
        $('#'+this.ID + '_icons').append(html);                                                        
        
        
        let ttl = domLevels.createDivElement(   this.parentID,
                                                this.ID,
                                                this.tester);

        
        let record;
        let HTML = '';
        let index = 1;
        HTML += '<div class="row row-in-table row-in-table-start">';
        
        let execBreak = false;
        
        while(index<1000) {
            for(let x=1;x<=columns;++x) {
                HTML += '<div class="col-sm-4 col-in-table ">';
                record = system.getRecordFromIndex(aFromDB, index); ++index;
                if(record==null) {execBreak = true; break;}
                    HTML += '<div class="col-in-table-left" >';
                        HTML += record[record['fieldName']+'Title'];
                    HTML += '</div>';
                    HTML += '<div class="col-in-table-right border-right" >';
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
        //HTML += '</div>';
        HTML += '</div>';
        HTML += '</div>';
        
        $('#'+this.ID).html(HTML);
        return null;
    } 
}
