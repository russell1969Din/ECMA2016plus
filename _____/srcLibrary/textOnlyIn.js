//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../css/insertTextOnly.css" />');
    //  CSS current template  
    //  .content

export class InsertTextOnly {

    constructor(data={}, container={}, otherParams={}) {
        this.data = data;
        for(let value of Object.values(container) ) {
            this.usingFields = value.usingFields;
            this.containerType = value.type;
            this.containerID = value.id;
            this.fadeIn = value.fadeIn;
            this.containerParentID = value.parentId;
        }        
        this.otherParams = otherParams;
    }
    
    execRender()    {
        let domLevels = new DomLevels();
    
        for(let other of Object.values(this.otherParams) ) {
                this.tester = other.tester;
        }
        for(let data of Object.values(this.data) ) {                        
            eval('this.content = data.' + this.usingFields.fieldName +  ';');
        }        
        
        let cnt = domLevels.createElement(  this.containerParentID,
                                            this.containerType,
                                            this.containerID, 
                                            this.tester);
                                            
        
        $('#'+this.containerID).addClass('content');
        if(this.usingFields.title.length>0)  $('#'+this.containerID).append('<b>' + this.usingFields.title + '</b><br />');
        $('#'+this.containerID).append(this.content);
    }
}
