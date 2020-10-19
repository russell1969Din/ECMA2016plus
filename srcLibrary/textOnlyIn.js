//======    Importuje triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";
//======    Importuje triedu System s metódami systémovej podpory
import {System} from "../srcRoot/system.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/textOnlyIn.css" />');
    //  CSS current template  
    //  .content

export class TextOnlyIn {

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
    
    
    execRender(data, container, otherParams) {
                          
        this.doConstruct(data, container, otherParams);
        if(typeof this.structJSON !='undefined') {
            let url = '../../jsonStructInfo/' + this.structJSON + '.json';                        
            fetch(url)
                .then(response => response.json())
                .then(result => this.textInContainer(result, data, container, otherParams));        
        } else {
            this.textInContainer({}, data, container, otherParams);
        }
    }
    
    textInContainer(viewFields, data, container, otherParams) {

        let domLevels = new DomLevels();
        
        let system = new System();
        let fromDB = system.getArrayFromData(viewFields, this.data[0]);
        
        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);

         //=======   Ak je this.fadeIn pre animáciu nastavený viac ako 0, zavolám animáciu 
        //          Animácie je možné nastavi aj v príslušnom kaskádovom štýle objektu tejto triedy           
        if(this.fadeIn > 0) {
            $('#'+this.ID).css('display','none');
            $('#'+this.ID).fadeIn(this.fadeIn);
        }

        $('#'+this.ID).addClass('content');
        if(fromDB[this.fieldNameIn+'Title'].length>0)  $('#'+this.ID).append('<b>' + fromDB[this.fieldNameIn+'Title'] + '</b><br />');
        $('#'+this.ID).append(fromDB[this.fieldNameIn]);
    }
    
    textConstantIn(data={}, container={}, otherParams={}) {

        this.doConstruct(data, container, otherParams);
        
    
        let domLevels = new DomLevels();

        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);
        if(typeof this.classCSS != 'undefined') {
            if(this.classCSS.trim().length==0) 
                $('#'+this.ID).addClass('constantElement');
            else 
                $('#'+this.ID).addClass(this.classCSS);
        } else {
            $('#'+this.ID).addClass('constantElement');
        }
        
        if(this.fadeIn > 0) {
            $('#'+this.ID).css('display','none');
            $('#'+this.ID).fadeIn(this.fadeIn);
        }

        $('#'+this.ID).append(this.content);   //fromDB[this.fieldNameIn]
    }
}
