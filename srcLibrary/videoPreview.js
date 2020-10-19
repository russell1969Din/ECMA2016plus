//======    Importuje triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";
import {TextOnlyIn} from "../srcLibrary/textOnlyIn.js";


//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/videoPreview.css" />');     
    //  CSS current template
    //  .parent-title
    //  .parent-win 
    //  .child-win
    //  .child-image

export class VideoPreview {
    
    constructor(data={}, container={}, otherParams={}) {
        
        this.doConstruct(data, container, otherParams);
        
        /*
        this.data = data;
    
        this.containerID = container.id;
        this.parentID = container.parentId;
        this.structJSON = container.structJSON;
        this.fieldNameIn = container.fieldNameIn;
        this.title = container.title;
        this.tester = otherParams.tester;
        */
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
       
        let videoPath;
        for(let path of Object.values(this.data) ) {videoPath = path[this.fieldNameIn];}
        if(videoPath.trim().length==0) return null;
        
        let domLevels  = new DomLevels();
        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);            

        $('#'+this.ID).addClass('living-of-video');    

        /*
        let container = {   'id':'title',
                            'content': this.title,
                            'parentId':this.ID};
*/                            
        let textOnlyIn = new TextOnlyIn({}, this.container, {});
        textOnlyIn.textConstantIn();
        
        let intro = domLevels.createDivElement( this.ID,
                                                this.ID + '_child', 
                                                this.tester);            
        $('#'+this.ID + '_child').addClass('container d-flex justify-content-center ');    
        let frame = '<iframe id="video-preview" align="center" src="'+ videoPath +'" frameborder="0" allowfullscreen=""></iframe>';
        $('#'+this.ID + '_child').append(frame);
        $('#'+'video-preview').addClass('living-of-frame')                                        
    }
}
